import { expect, test, type APIRequestContext, type Locator, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const tabNames = ['문제와 목표', '서비스 구조', '사용 흐름', '전체 기술', '기술 고도화', '구현 기여']
const technologies = ['Figma', 'React', 'Vue.js', 'Java', 'Spring Boot', 'JPA', 'Docker', 'PostgreSQL', 'MongoDB', 'Redis', 'LangChain']

async function openExperfolio(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const trigger = page.getByRole('button', { name: 'Experfolio 프로젝트 상세 보기', exact: true })
  await trigger.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  return trigger
}

async function expectLoaded(image: Locator) {
  await image.scrollIntoViewIfNeeded()
  await expect.poll(() => image.evaluate(node => {
    const element = node as HTMLImageElement
    return element.complete && element.naturalWidth > 0 && element.naturalHeight > 0
  })).toBe(true)
}

async function expectEvidenceLoaded(scope: Locator, page: Page, request: APIRequestContext) {
  const collapsedEvidence = scope.locator('details:not([open]) > summary')
  while (await collapsedEvidence.count() > 0) {
    await collapsedEvidence.first().click()
  }
  const images = scope.locator('figure img')
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute('alt', /\S+/)
    await expect(image).toHaveAttribute('src', /\/images\/[^/]+\.webp$/)
    await expectLoaded(image)
  }
  const originals = scope.getByRole('link', { name: /원본 보기/ })
  await expect(originals).toHaveCount(await images.count())
  for (const original of await originals.all()) {
    await expect(original).toHaveAttribute('target', '_blank')
    await expect(original).toHaveAttribute('rel', /noopener/)
    await expect(original).toHaveAttribute('rel', /noreferrer/)
    const href = await original.getAttribute('href')
    const response = await request.get(new URL(href!, page.url()).toString())
    expect(response.ok(), href!).toBe(true)
    expect(response.headers()['content-type']).toMatch(/^image\/webp/)
  }
}

async function expectFits(page: Page) {
  const dimensions = await page.getByRole('dialog').evaluate(element => ({
    left: element.getBoundingClientRect().left,
    right: element.getBoundingClientRect().right,
    scroll: element.scrollWidth,
    client: element.clientWidth,
    viewport: window.innerWidth,
  }))
  expect(dimensions.left).toBeGreaterThanOrEqual(0)
  expect(dimensions.right).toBeLessThanOrEqual(dimensions.viewport)
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1)
  expect(await page.getByRole('tabpanel').evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
}

async function expectSelectedTabVisible(tab: Locator) {
  await expect(tab).toBeFocused()
  await expect(tab).toHaveAttribute('aria-selected', 'true')
  await expect.poll(() => tab.evaluate(element => {
    const list = element.closest('[role="tablist"]')
    if (!list) return false
    const tabBounds = element.getBoundingClientRect()
    const listBounds = list.getBoundingClientRect()
    return tabBounds.left >= listBounds.left - 1 && tabBounds.right <= listBounds.right + 1
  })).toBe(true)
}

test('Experfolio presents the complete service journey, local technology icons, and individual contribution', async ({ page, request }) => {
  await openExperfolio(page)
  const dialog = page.getByRole('dialog')
  const panel = dialog.getByRole('tabpanel')
  await expect(dialog.getByRole('tab')).toHaveText(tabNames)
  await expect(panel).toHaveCount(1)
  await expect(dialog.getByRole('tab', { name: '문제와 목표', exact: true })).toHaveAttribute('aria-selected', 'true')
  await expectEvidenceLoaded(panel, page, request)

  await dialog.getByRole('tab', { name: '서비스 구조', exact: true }).click()
  await expect(panel).toContainText('Spring Boot')
  await expect(panel).toContainText('FastAPI')
  await expectEvidenceLoaded(panel, page, request)

  await panel.getByRole('button', { name: '사용 흐름 살펴보기', exact: true }).click()
  const journey = dialog.getByRole('tab', { name: '사용 흐름', exact: true })
  await expect(journey).toBeFocused()
  await expect(journey).toHaveAttribute('aria-selected', 'true')
  await expect(panel.locator('.journey-stage').getByRole('heading', { name: '추천 근거를 실제 프로필·실적·링크로 확인', exact: true })).toBeVisible()

  await journey.click()
  const steps = panel.locator('.journey-steps button')
  expect(await steps.count()).toBeGreaterThanOrEqual(6)
  const headings = new Set<string>()
  for (let index = 0; index < await steps.count(); index += 1) {
    const step = steps.nth(index)
    await step.click()
    await expect(step).toHaveAttribute('aria-pressed', 'true')
    await expect(panel.locator('.journey-steps button[aria-pressed="true"]')).toHaveCount(1)
    const stage = panel.locator('#journey-stage')
    const heading = stage.getByRole('heading', { level: 4 })
    await expect(heading).toBeVisible()
    const title = (await heading.textContent())!.trim()
    expect(title).not.toBe('')
    await expect(step).toContainText(title)
    headings.add(title)
    expect(await stage.locator('figure img').count()).toBeGreaterThan(0)
    await expectEvidenceLoaded(stage, page, request)
  }
  expect(headings.size).toBe(await steps.count())

  await dialog.getByRole('tab', { name: '전체 기술', exact: true }).click()
  const primaryStack = panel.locator('.case-primary-stack')
  for (const name of technologies) {
    const label = primaryStack.getByText(name, { exact: true })
    await expect(label).toBeVisible()
    const image = label.locator('img')
    await expect(image).toHaveAttribute('alt', '')
    await expect(image).toHaveAttribute('aria-hidden', 'true')
    await expect(image).toHaveAttribute('src', /\/icons\/[a-z]+\.svg$/)
    await expectLoaded(image)
  }
  await expectEvidenceLoaded(panel, page, request)

  await dialog.getByRole('tab', { name: '구현 기여', exact: true }).click()
  for (const evidence of ['useLazyApi', 'SearchPage.jsx', '60초', '섹션']) {
    await expect(panel).toContainText(evidence)
  }
  await expect(panel).toContainText('정형')
  await expect(panel).toContainText('먼저')
  await expect(panel).toContainText('근거')
  await expect(panel.getByRole('heading', { name: '제가 맡은 일', exact: true })).toBeVisible()
  await expect(panel.getByRole('heading', { name: '결과와 배운 점', exact: true })).toBeVisible()
  await expectEvidenceLoaded(panel, page, request)
})

test('Experfolio evolution exposes three stages and sourced evaluation numbers, with correct tab and dialog focus', async ({ page, request }) => {
  const trigger = await openExperfolio(page)
  const dialog = page.getByRole('dialog')
  const panel = dialog.getByRole('tabpanel')
  const overview = dialog.getByRole('tab', { name: '문제와 목표', exact: true })
  const contribution = dialog.getByRole('tab', { name: '구현 기여', exact: true })
  const evolution = dialog.getByRole('tab', { name: '기술 고도화', exact: true })
  await overview.focus()
  await page.keyboard.press('End')
  await expectSelectedTabVisible(contribution)
  await page.keyboard.press('ArrowRight')
  await expectSelectedTabVisible(overview)
  await page.keyboard.press('ArrowLeft')
  await expectSelectedTabVisible(contribution)
  await page.keyboard.press('Home')
  await expectSelectedTabVisible(overview)
  await page.keyboard.press('End')
  await page.keyboard.press('ArrowLeft')
  await expectSelectedTabVisible(evolution)

  const stages = panel.locator('.evolution-stage-picker button')
  await expect(stages).toHaveCount(3)
  const stageDescriptions = new Set<string>()
  for (let index = 0; index < await stages.count(); index += 1) {
    const stage = stages.nth(index)
    await stage.click()
    await expect(stage).toHaveAttribute('aria-pressed', 'true')
    await expect(panel.locator('.evolution-stage-picker button[aria-pressed="true"]')).toHaveCount(1)
    const content = panel.locator('.evolution-stage-content')
    await expect(content).toBeVisible()
    stageDescriptions.add((await content.textContent())!.trim())
    await expectEvidenceLoaded(content, page, request)
  }
  expect(stageDescriptions.size).toBe(3)

  const metrics = panel.getByRole('table', { name: '발표 자료의 검색 성능 평가', exact: true })
  await expect(metrics).toBeVisible()
  await expect(metrics.getByRole('row')).toHaveCount(6)
  for (const [before, after] of [['113', '210'], ['145', '215'], ['217', '596'], ['273', '631'], ['374', '789']]) {
    const row = metrics.getByRole('row').filter({ hasText: new RegExp(`0?\\.${before}`) })
    await expect(row).toHaveCount(1)
    await expect(row).toContainText(new RegExp(`0?\\.${after}`))
  }
  await expect(panel).toContainText('500')
  await expect(panel).toContainText('발표 자료')
  await expectEvidenceLoaded(panel, page, request)

  await panel.getByRole('button', { name: '제가 맡은 구현 살펴보기', exact: true }).click()
  await expect(contribution).toBeFocused()
  await expect(contribution).toHaveAttribute('aria-selected', 'true')
  await expect(panel.getByRole('heading', { name: '제가 맡은 일', exact: true })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  expect(await page.locator('body').evaluate(element => element.style.overflow)).not.toBe('hidden')
  await trigger.click()
  await expect(page.getByRole('dialog').getByRole('tab', { name: '문제와 목표', exact: true })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('dialog').getByRole('button', { name: '프로젝트 상세 닫기', exact: true })).toBeFocused()
})

test('Experfolio stays accessible across six tabs at 320, 390, 768, and 1440px', async ({ page }, testInfo) => {
  test.setTimeout(120_000)
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 })
    await openExperfolio(page)
    const dialog = page.getByRole('dialog')
    const panel = dialog.getByRole('tabpanel')
    for (const name of tabNames) {
      await dialog.getByRole('tab', { name, exact: true }).click()
      await expect(panel).toHaveCount(1)
      await expectFits(page)
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
      await testInfo.attach(`experfolio-${width}-${name}`, { body: JSON.stringify(result.violations, null, 2), contentType: 'application/json' })
      expect.soft(result.violations.map(violation => ({
        rule: violation.id,
        elements: violation.nodes.map(node => ({ target: node.target, message: node.failureSummary })),
      })), `${width}px / ${name}`).toEqual([])

      if (name === '사용 흐름' || name === '기술 고도화') {
        const selector = name === '사용 흐름' ? '.journey-steps button' : '.evolution-stage-picker button'
        const steps = panel.locator(selector)
        for (let index = 0; index < await steps.count(); index += 1) {
          await steps.nth(index).click()
          await expectFits(page)
        }
      }
    }

    const overview = dialog.getByRole('tab', { name: '문제와 목표', exact: true })
    const contribution = dialog.getByRole('tab', { name: '구현 기여', exact: true })
    await overview.focus()
    await page.keyboard.press('End')
    await expectSelectedTabVisible(contribution)
    await page.keyboard.press('Home')
    await expectSelectedTabVisible(overview)
    await expectFits(page)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
  }
})
