import { expect, test, type APIRequestContext, type Locator, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const tabNames = ['문제와 목표', '공공데이터', '서비스 구조', '사용 흐름', '전체 기술', '구현 기여']

async function openCarvery(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const trigger = page.getByRole('button', { name: 'Carvery 프로젝트 상세 보기', exact: true })
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
  while (await collapsedEvidence.count() > 0) await collapsedEvidence.first().click()

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

test('Carvery connects its project overview to attributed public datasets and the documented processing tools', async ({ page, request }) => {
  await openCarvery(page)
  const dialog = page.getByRole('dialog')
  const panel = dialog.getByRole('tabpanel')
  await expect(dialog.getByRole('tab')).toHaveText(tabNames)
  await expect(panel).toHaveCount(1)
  await expect(dialog.getByRole('tab', { name: '문제와 목표', exact: true })).toHaveAttribute('aria-selected', 'true')
  await panel.getByRole('button', { name: '공공데이터 살펴보기', exact: true }).click()
  const publicData = dialog.getByRole('tab', { name: '공공데이터', exact: true })
  await expectSelectedTabVisible(publicData)
  await expect(panel.locator('.public-dataset')).toHaveCount(2)
  await expect(panel).toContainText(/약\s*14,700개/)
  await expect(panel).toContainText(/약\s*35,000개/)

  for (const path of ['localdata.go.kr/lif/lifeCtacDataView.do', 'data.go.kr/data/15028204/standard.do']) {
    const source = panel.locator(`.public-dataset a[href*="${path}"]`)
    await expect(source).toHaveCount(1)
    await expect(source).toBeVisible()
    await expect(source).toHaveAttribute('href', /^https:\/\//)
    await expect(source).toHaveAttribute('target', '_blank')
    await expect(source).toHaveAttribute('rel', /noopener/)
    await expect(source).toHaveAttribute('rel', /noreferrer/)
  }

  await expect(panel.locator('.data-processing-steps')).toBeVisible()
  for (const operation of ['pandas', 'read_csv', 'usecols', 'dropna', 'SQLAlchemy', 'create_engine', 'MariaDB', 'PyMySQL']) {
    await expect(panel).toContainText(operation)
  }
  await expect(panel.locator('.data-column-table')).toBeVisible()
  expect(await panel.locator('.data-column-table').getByRole('row').count()).toBeGreaterThan(1)
  const integrations = panel.locator('.data-integrations')
  await expect(integrations).toBeVisible()
  await expect(integrations).toContainText('카카오')
  await expect(integrations).toContainText('날씨')
  await expectEvidenceLoaded(panel, page, request)

  await panel.getByRole('button', { name: '실제 서비스 화면 살펴보기', exact: true }).click()
  const journey = dialog.getByRole('tab', { name: '사용 흐름', exact: true })
  await expectSelectedTabVisible(journey)
  await expect(panel.locator('#journey-stage').getByRole('heading', { level: 4 })).toBeVisible()

  await dialog.getByRole('tab', { name: '전체 기술', exact: true }).click()
  for (const name of ['Python', 'pandas', 'SQLAlchemy', 'MariaDB']) {
    const label = panel.locator('.technology-row dt').filter({ has: page.getByText(name, { exact: true }) })
    await expect(label).toBeVisible()
    const image = label.locator('img')
    await expect(image).toHaveAttribute('alt', '')
    await expect(image).toHaveAttribute('aria-hidden', 'true')
    await expect(image).toHaveAttribute('src', /\/icons\/[a-z]+\.svg$/)
    await expectLoaded(image)
  }
  await expect(panel).toContainText('PyMySQL')
  await expectEvidenceLoaded(panel, page, request)
})

test('Carvery renders every documented journey screen and preserves keyboard navigation and dialog focus', async ({ page, request }) => {
  const trigger = await openCarvery(page)
  const dialog = page.getByRole('dialog')
  const panel = dialog.getByRole('tabpanel')
  const overview = dialog.getByRole('tab', { name: '문제와 목표', exact: true })
  const contribution = dialog.getByRole('tab', { name: '구현 기여', exact: true })
  await overview.focus()
  await page.keyboard.press('End')
  await expectSelectedTabVisible(contribution)
  await page.keyboard.press('ArrowRight')
  await expectSelectedTabVisible(overview)
  await page.keyboard.press('ArrowLeft')
  await expectSelectedTabVisible(contribution)
  await page.keyboard.press('Home')
  await expectSelectedTabVisible(overview)

  await dialog.getByRole('tab', { name: '서비스 구조', exact: true }).click()
  await expectEvidenceLoaded(panel, page, request)
  await dialog.getByRole('tab', { name: '사용 흐름', exact: true }).click()
  const steps = panel.locator('.journey-steps button')
  await expect(steps).toHaveCount(7)
  const headings = new Set<string>()
  const screenshots = new Set<string>()
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
    const images = stage.locator('figure img')
    expect(await images.count()).toBeGreaterThan(0)
    for (const image of await images.all()) screenshots.add((await image.getAttribute('src'))!)
    await expectEvidenceLoaded(stage, page, request)
  }
  expect(headings.size).toBe(7)
  expect(screenshots.size).toBe(11)

  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  expect(await page.locator('body').evaluate(element => element.style.overflow)).not.toBe('hidden')
  await trigger.click()
  await expect(page.getByRole('dialog').getByRole('tab', { name: '문제와 목표', exact: true })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('dialog').getByRole('button', { name: '프로젝트 상세 닫기', exact: true })).toBeFocused()
})

test('Carvery remains accessible across all six tabs at 320, 390, 768, and 1440px', async ({ page }, testInfo) => {
  test.setTimeout(120_000)
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 })
    await openCarvery(page)
    const dialog = page.getByRole('dialog')
    const panel = dialog.getByRole('tabpanel')
    for (const name of tabNames) {
      await dialog.getByRole('tab', { name, exact: true }).click()
      await expect(panel).toHaveCount(1)
      await expectFits(page)
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
      await testInfo.attach(`carvery-${width}-${name}`, { body: JSON.stringify(result.violations, null, 2), contentType: 'application/json' })
      expect.soft(result.violations.map(violation => ({
        rule: violation.id,
        elements: violation.nodes.map(node => ({ target: node.target, message: node.failureSummary })),
      })), `${width}px / ${name}`).toEqual([])
      if (name === '사용 흐름') {
        const steps = panel.locator('.journey-steps button')
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
