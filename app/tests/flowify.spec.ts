import { expect, test, type Locator, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

async function visit(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
}

async function expectLoaded(image: Locator) {
  await image.scrollIntoViewIfNeeded()
  await expect.poll(() => image.evaluate(node => {
    const element = node as HTMLImageElement
    return element.complete && element.naturalWidth > 0 && element.naturalHeight > 0
  })).toBe(true)
}

async function expectDialogFits(page: Page) {
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
  const panel = page.getByRole('tabpanel')
  expect(await panel.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
}

async function expectSelectedTabInView(tab: Locator) {
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

const primaryTechnologies = [
  'React', 'TypeScript', 'Vite', 'Spring Boot', 'Java', 'MongoDB', 'FastAPI', 'LangChain', 'Docker',
]

const journeySteps = [
  { title: '외부 서비스 연결', images: ['flowify-services.webp'] },
  { title: '내 자동화와 공유받은 워크플로우 확인', images: ['flowify-workflow-list.webp'] },
  { title: '클릭으로 데이터 소스와 처리 방식 선택', images: ['flowify-creation-mode.webp', 'flowify-source-picker.webp', 'flowify-processing.webp'] },
  { title: '자연어로 워크플로우 생성', images: ['flowify-ai-chat.webp', 'flowify-ai-generated.webp'] },
  { title: 'Gmail 요약을 Discord에서 확인', images: ['flowify-execution-flow.webp'] },
  { title: '자주 쓰는 자동화는 템플릿으로 재사용', images: ['flowify-templates.webp'] },
]

test('profile portrait and all nine primary technologies render as local, complete images', async ({ page }) => {
  await visit(page)
  const portraits = page.getByRole('img', { name: '최호림 프로필 사진', exact: true })
  expect(await portraits.count()).toBeGreaterThan(0)
  for (const portrait of await portraits.all()) {
    await expect(portrait).toHaveAttribute('src', /\/images\/choihorim-profile\.webp$/)
    await expectLoaded(portrait)
  }

  const technologyList = page.getByRole('list', { name: '주요 사용 기술' })
  await expect(technologyList.getByRole('listitem')).toHaveCount(9)
  for (const name of primaryTechnologies) {
    const item = technologyList.getByRole('listitem').filter({ has: page.getByText(name, { exact: true }) })
    await expect(item).toHaveCount(1)
    const image = item.locator('img')
    await expect(image).toHaveAttribute('alt', '')
    await expect(image).toHaveAttribute('aria-hidden', 'true')
    await expect(image).toHaveAttribute('src', /\/icons\/[a-z]+\.svg$/)
    await expectLoaded(image)
  }
})

test('Flowify case study supports keyboard tabs, real screenshot journeys, and detailed contribution evidence', async ({ page, request }) => {
  await visit(page)
  const trigger = page.getByRole('button', { name: 'Flowify 프로젝트 상세 보기', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  const tabs = dialog.getByRole('tab')
  const panel = dialog.getByRole('tabpanel')
  await expect(tabs).toHaveCount(5)
  await expect(panel).toHaveCount(1)
  const overview = dialog.getByRole('tab', { name: '문제와 목표', exact: true })
  const architecture = dialog.getByRole('tab', { name: '서비스 구조', exact: true })
  const journey = dialog.getByRole('tab', { name: '사용 흐름', exact: true })
  const contribution = dialog.getByRole('tab', { name: '구현 기여', exact: true })
  const technology = dialog.getByRole('tab', { name: '전체 기술', exact: true })
  await expect(overview).toHaveAttribute('aria-selected', 'true')
  await expect(panel.getByRole('heading', { name: 'AI의 답변을 실제 업무의 자동화로 연결합니다.', exact: true })).toBeVisible()
  for (const problem of [/반복되는\s*수동\s*전달/, /복잡한\s*자동화\s*설정/, /부족한\s*설계\s*안내/]) {
    await expect(panel.getByRole('heading', { name: problem })).toBeVisible()
  }
  await expect(panel.getByRole('heading', { name: '팀이 세운 다섯 가지 설계 목표', exact: true })).toBeVisible()
  for (const goal of ['기능', '사용성', '안정성', '보안', '확장성']) {
    await expect(panel.getByText(goal, { exact: true })).toBeVisible()
  }

  await panel.getByRole('button', { name: '서비스 구조 살펴보기', exact: true }).click()
  await expect(architecture).toBeFocused()
  await expect(architecture).toHaveAttribute('aria-selected', 'true')
  await expect(panel).toContainText('Spring Boot')
  await expect(panel).toContainText('FastAPI')
  await expect(panel).toContainText('OAuth')

  await panel.getByRole('button', { name: '사용 흐름 살펴보기', exact: true }).click()
  await expect(journey).toBeFocused()
  await expect(journey).toHaveAttribute('aria-selected', 'true')
  await expect(panel.locator('#journey-stage').getByRole('heading', { name: 'Gmail 요약을 Discord에서 확인', exact: true })).toBeVisible()
  await expect(panel.getByRole('button', { name: /Gmail 요약을 Discord에서 확인/ })).toHaveAttribute('aria-pressed', 'true')

  await architecture.click()
  await architecture.focus()
  await page.keyboard.press('End')
  await expect(technology).toBeFocused()
  await expect(technology).toHaveAttribute('aria-selected', 'true')
  const completeStack = [
    'React + TypeScript', 'Vite', 'Chakra UI', 'React Flow', 'Zustand + Immer', 'TanStack Query', 'Axios',
    'Spring Boot + Java', 'Spring Security + JWT', 'Spring Data MongoDB', 'Spring WebFlux WebClient',
    'FastAPI', 'LangChain + ChatOpenAI', 'Motor', 'APScheduler', 'MongoDB', 'Docker + Docker Compose',
  ]
  for (const name of completeStack) {
    await expect(panel.locator('dl').getByText(name, { exact: true })).toBeVisible()
  }

  await page.keyboard.press('ArrowRight')
  await expect(overview).toBeFocused()
  await expect(overview).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('ArrowLeft')
  await expect(technology).toBeFocused()
  await page.keyboard.press('Home')
  await expect(overview).toBeFocused()
  await expect(overview).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('ArrowRight')
  await expect(architecture).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(journey).toBeFocused()
  await expect(journey).toHaveAttribute('aria-selected', 'true')

  for (const step of journeySteps) {
    const button = panel.getByRole('button', { name: new RegExp(step.title) })
    await button.click()
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(panel.getByRole('button', { pressed: true })).toHaveCount(1)
    const stage = panel.locator('#journey-stage')
    await expect(stage.getByRole('heading', { name: step.title, exact: true })).toBeVisible()
    await expect(stage.locator('figure img')).toHaveCount(step.images.length)
    for (const filename of step.images) {
      const image = stage.locator(`img[src$="/${filename}"]`)
      await expect(image).toHaveAttribute('alt', /\S+/)
      await expectLoaded(image)
    }
    const originals = stage.getByRole('link', { name: /원본 보기/ })
    await expect(originals).toHaveCount(step.images.length)
    for (const original of await originals.all()) {
      await expect(original).toHaveAttribute('target', '_blank')
      await expect(original).toHaveAttribute('rel', /noopener/)
      await expect(original).toHaveAttribute('rel', /noreferrer/)
      const path = await original.getAttribute('href')
      const response = await request.get(new URL(path!, page.url()).toString())
      expect(response.ok(), path!).toBe(true)
      expect(response.headers()['content-type']).toMatch(/^image\/webp/)
    }
    if (step.title === 'Gmail 요약을 Discord에서 확인') {
      await expect(stage).toContainText('Discord에 메일 요약이 도착하는 결과를 확인했습니다.')
      await expect(stage.locator('figcaption')).toContainText('입력 전 설정 단계')
    }
  }

  await contribution.click()
  await expect(panel.getByRole('heading', { name: '제가 맡은 일', exact: true })).toBeVisible()
  await expect(panel.locator('.case-problem')).toBeVisible()
  await expect(panel).toContainText('API payload')
  await expect(panel).toContainText('GitHub field selection')
  await expect(panel).toContainText('sink delivery')
  await expect(panel).toContainText('metadata')
  await expect(panel.getByRole('heading', { name: '결과와 배운 점', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()

  await page.getByRole('button', { name: 'Experfolio 프로젝트 상세 보기', exact: true }).click()
  await expect(page.getByRole('dialog').getByRole('tab')).toHaveCount(6)
  await expect(page.getByRole('dialog').getByRole('tab', { name: '문제와 목표', exact: true })).toHaveAttribute('aria-selected', 'true')
})

test('mobile page and every Flowify tab remain accessible without horizontal overflow', async ({ page }, testInfo) => {
  test.setTimeout(60_000)
  await page.setViewportSize({ width: 390, height: 844 })
  await visit(page)

  async function audit(label: string) {
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    await testInfo.attach(label, {
      body: JSON.stringify(result.violations, null, 2),
      contentType: 'application/json',
    })
    expect.soft(result.violations.map(violation => ({
      rule: violation.id,
      elements: violation.nodes.map(node => ({ target: node.target, message: node.failureSummary })),
    })), label).toEqual([])
  }

  await audit('mobile-page')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.getByRole('button', { name: 'Flowify 프로젝트 상세 보기', exact: true }).click()
  for (const name of ['문제와 목표', '서비스 구조', '사용 흐름', '구현 기여', '전체 기술']) {
    await page.getByRole('tab', { name, exact: true }).click()
    await expect(page.getByRole('tabpanel')).toHaveCount(1)
    await expectDialogFits(page)
    await audit(`mobile-flowify-${name}`)
    if (name === '사용 흐름') {
      for (const step of journeySteps) {
        await page.getByRole('tabpanel').getByRole('button', { name: new RegExp(step.title) }).click()
        await expectDialogFits(page)
      }
    }
  }

  await page.setViewportSize({ width: 320, height: 844 })
  const overview = page.getByRole('tab', { name: '문제와 목표', exact: true })
  const technology = page.getByRole('tab', { name: '전체 기술', exact: true })
  await overview.click()
  await page.keyboard.press('End')
  await expectSelectedTabInView(technology)
  await expectDialogFits(page)
  await page.keyboard.press('Home')
  await expectSelectedTabInView(overview)
  await expectDialogFits(page)
})
