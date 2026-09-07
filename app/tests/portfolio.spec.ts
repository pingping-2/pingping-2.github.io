import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { profile } from '../src/data/portfolio'

async function visit(page: Page) {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
}

async function expectNoOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    html: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }))
  expect(dimensions.html, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport + 1)
  expect(dimensions.body, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport + 1)
}

test('320–1920px layouts retain identity, complete images, and error-free rendering', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })

  for (const width of [320, 360, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 })
    await visit(page)
    await expect(page.locator('#top')).toContainText('최호림')
    await expect(page.locator('#top')).toContainText('백엔드')
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/화면 너머의 흐름까지\s*생각합니다\./)
    const introduction = page.locator('main > section').first()
    await expect(introduction).toHaveAttribute('id', 'top')
    await expect(introduction.locator('#about')).toHaveCount(1)
    await expect(page.locator('#about')).toHaveCount(1)
    await expect(page.locator('section#about')).toHaveCount(0)
    await expect(page.getByRole('img', { name: '최호림 프로필 사진', exact: true })).toHaveCount(1)
    for (const paragraph of profile.about) {
      await expect(introduction.getByText(paragraph, { exact: true })).toHaveCount(1)
      await expect(page.getByText(paragraph, { exact: true })).toHaveCount(1)
    }
    await expect(page.locator('main')).not.toContainText('아이디어가 작동하는')
    await expect(introduction.locator(`a[href="${profile.github}"]`)).toHaveCount(1)
    await expectNoOverflow(page)

    for (const id of ['projects', 'about', 'skills', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      await expectNoOverflow(page)
    }

    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded()
      if (await image.getAttribute('aria-hidden') === 'true') {
        await expect(image).toHaveAttribute('alt', '')
      } else {
        await expect(image).toHaveAttribute('alt', /\S+/)
      }
      await expect.poll(() => image.evaluate(node => {
        const element = node as HTMLImageElement
        return element.complete && element.naturalWidth > 0 && element.naturalHeight > 0
      })).toBe(true)
    }

    const preview = page.locator('.project-card').first().locator('.project-screenshot')
    await preview.scrollIntoViewIfNeeded()
    const previewBounds = await preview.boundingBox()
    expect(previewBounds).not.toBeNull()
    await page.mouse.click(previewBounds!.x + previewBounds!.width / 2, previewBounds!.y + previewBounds!.height / 2)
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    const dialogSize = await dialog.evaluate(element => ({
      left: element.getBoundingClientRect().left,
      right: element.getBoundingClientRect().right,
      scroll: element.scrollWidth,
      client: element.clientWidth,
    }))
    expect(dialogSize.left).toBeGreaterThanOrEqual(0)
    expect(dialogSize.right).toBeLessThanOrEqual(width)
    expect(dialogSize.scroll).toBeLessThanOrEqual(dialogSize.client + 1)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    if ([320, 390, 1440, 1920].includes(width)) {
      await page.screenshot({ path: `.artifacts/portfolio-${width}.png`, fullPage: true, animations: 'disabled' })
    }
  }
  expect(errors).toEqual([])
})

test('links resolve to real destinations and page metadata describes the owner', async ({ page, request }) => {
  await visit(page)
  await expect(page).toHaveTitle(/최호림/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
  for (const selector of ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]']) {
    await expect(page.locator(selector)).toHaveAttribute('content', /^.{10,}$/)
  }
  const assetSelectors = ['link[rel="icon"]', 'meta[property="og:image"]']
  for (const selector of assetSelectors) {
    const element = page.locator(selector).first()
    const path = await element.getAttribute(selector.startsWith('link') ? 'href' : 'content')
    expect(path).toBeTruthy()
    const response = await request.get(new URL(path!, page.url()).toString())
    expect(response.ok(), `${selector}: ${path}`).toBe(true)
  }

  const invalidLinks = await page.locator('a').evaluateAll(links => links.flatMap(link => {
    const href = link.getAttribute('href') || ''
    const errors: string[] = []
    if (!href || href === '#' || /^javascript:/i.test(href)) errors.push(`Empty destination: ${link.textContent}`)
    if (href.startsWith('#') && !document.getElementById(decodeURIComponent(href.slice(1)))) errors.push(`Missing section: ${href}`)
    if (/^https?:/i.test(href) && (!link.rel.includes('noopener') || !link.rel.includes('noreferrer') || link.target !== '_blank')) errors.push(`Unsafe external link: ${href}`)
    if (!href.startsWith('#') && !/^https?:|^mailto:/i.test(href)) errors.push(`Unexpected link: ${href}`)
    return errors
  }))
  expect(invalidLinks).toEqual([])
  await expect(page.locator('a[href="mailto:horim2480@gmail.com"]').first()).toBeAttached()
  await expect(page.locator('a[href="https://github.com/pingping-2"]').first()).toBeAttached()
})

test('mobile navigation closes on selection and Escape, preserving keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await visit(page)
  const toggle = page.getByRole('button', { name: '메뉴 열기' })
  const nav = page.getByRole('navigation', { name: '주요 메뉴' })
  await expect(nav).not.toBeVisible()
  for (const [name, id] of [['Portfolio', 'projects'], ['About', 'about']]) {
    await toggle.click()
    await expect(page.getByRole('button', { name: '메뉴 닫기' })).toHaveAttribute('aria-expanded', 'true')
    await nav.getByRole('link', { name, exact: true }).click()
    await expect(nav).not.toBeVisible()
    await expect(page.locator(`#${id}`)).toBeFocused()
    await expect(page).toHaveURL(new RegExp(`#${id}$`))
    await expect(page.locator(`#main-navigation a[href="#${id}"]`)).toHaveAttribute('aria-current', 'location')
  }

  await page.getByRole('button', { name: '메뉴 열기' }).click()
  await expect(nav).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(nav).not.toBeVisible()
  await expect(page.getByRole('button', { name: '메뉴 열기' })).toBeFocused()
})

test('section navigation tracks the section in view and supports the skip link', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await visit(page)
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: '본문으로 건너뛰기' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)

  const nav = page.getByRole('navigation', { name: '주요 메뉴' })
  for (const [name, id] of [['Portfolio', 'projects'], ['About', 'about'], ['Skills', 'skills'], ['Contact', 'contact']]) {
    const link = nav.getByRole('link', { name, exact: true })
    await link.click()
    await expect(link).toHaveAttribute('aria-current', 'location')
    await expect(nav.locator('[aria-current="location"]')).toHaveCount(1)
    await expect(page.locator(`#${id}`)).toBeFocused()
  }
})

test('project details expose both case studies and contain keyboard focus until closed', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await visit(page)
  for (const title of ['Flowify', 'Experfolio']) {
    const trigger = page.getByRole('button', { name: new RegExp(`^${title} 프로젝트 상세 보기$`, 'i') })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { name: new RegExp(`^${title}$`, 'i') })).toBeVisible()
    await expect(dialog).toContainText('담당 역할')
    const close = dialog.getByRole('button', { name: '프로젝트 상세 닫기' })
    await expect(close).toBeFocused()
    await dialog.getByRole('tab', { name: '구현 기여' }).click()
    await expect(dialog).toContainText('제가 맡은 일')
    await expect(dialog).toContainText('결과와 배운 점')
    await expect(dialog.getByRole('link', { name: /GitHub 저장소/ })).toHaveAttribute('href', /^https:\/\/github\.com\//)
    await close.focus()
    await page.keyboard.press('Shift+Tab')
    await expect.poll(() => dialog.evaluate(element => element.contains(document.activeElement))).toBe(true)
    await page.keyboard.press('Tab')
    await expect(close).toBeFocused()
    for (const image of await dialog.locator('img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    }
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
    expect(await page.locator('body').evaluate(element => element.style.overflow)).not.toBe('hidden')
  }
})

test('email copy succeeds and exposes an accessible fallback when clipboard access fails', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await visit(page)
  const copy = page.getByRole('button', { name: '이메일 주소 복사' })
  const status = page.locator('#contact [role="status"]')
  await copy.click()
  await expect(status).toHaveText('이메일 주소를 복사했습니다.')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('horim2480@gmail.com')

  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      configurable: true,
      value: async () => { throw new DOMException('Clipboard access denied', 'NotAllowedError') },
    })
  })
  await copy.click()
  await expect(status).toContainText('주소를 선택해 복사하거나 이메일 링크를 이용해 주세요.')
  await expect(page.locator('#contact a[href="mailto:horim2480@gmail.com"]').first()).toBeVisible()
})

test('page and open project dialog pass automated WCAG accessibility checks', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await visit(page)
  const pageScan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  await testInfo.attach('accessibility-page', { body: JSON.stringify(pageScan.violations, null, 2), contentType: 'application/json' })
  expect.soft(pageScan.violations.map(violation => ({ rule: violation.id, elements: violation.nodes.map(node => ({ target: node.target, message: node.failureSummary })) }))).toEqual([])
  const labelScan = await new AxeBuilder({ page }).withRules(['label-content-name-mismatch']).analyze()
  await testInfo.attach('accessibility-visible-labels', { body: JSON.stringify(labelScan.violations, null, 2), contentType: 'application/json' })
  expect.soft(labelScan.violations.map(violation => ({ rule: violation.id, elements: violation.nodes.map(node => ({ target: node.target, message: node.failureSummary })) }))).toEqual([])
  await page.getByRole('button', { name: /^Flowify 프로젝트 상세 보기$/ }).click()
  const dialogScan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  await testInfo.attach('accessibility-dialog', { body: JSON.stringify(dialogScan.violations, null, 2), contentType: 'application/json' })
  expect.soft(dialogScan.violations.map(violation => ({ rule: violation.id, elements: violation.nodes.map(node => ({ target: node.target, message: node.failureSummary })) }))).toEqual([])
  const dialog = page.getByRole('dialog')
  for (const [label, target] of [['case-study', '[role="tabpanel"]:not([hidden])'], ['project-links', '.dialog-links']] as const) {
    await dialog.locator(target).last().scrollIntoViewIfNeeded()
    const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    await testInfo.attach(`accessibility-dialog-${label}`, { body: JSON.stringify(scan.violations, null, 2), contentType: 'application/json' })
    expect.soft(scan.violations.map(violation => ({ rule: violation.id, elements: violation.nodes.map(node => ({ target: node.target, message: node.failureSummary })) }))).toEqual([])
  }
})

test('reduced-motion preference keeps content visible and removes continuous motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await visit(page)
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
  expect(await page.locator('html').evaluate(element => getComputedStyle(element).scrollBehavior)).toBe('auto')
  const motion = await page.locator('body *').evaluateAll(elements => elements.flatMap(element => {
    const style = getComputedStyle(element)
    const duration = Math.max(...style.animationDuration.split(',').map(value => parseFloat(value) || 0))
    return style.animationName !== 'none' && duration > 0.01 ? [`${element.tagName}.${element.className}: ${duration}s`] : []
  }))
  expect(motion).toEqual([])
  for (const section of await page.locator('[data-reveal]:visible').all()) {
    await section.scrollIntoViewIfNeeded()
    await expect(section).toHaveCSS('opacity', '1')
  }
  await expectNoOverflow(page)
})
