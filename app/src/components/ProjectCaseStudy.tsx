import { useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import type { Project } from '../data/portfolio'
import { Icon } from './Icon'
import { TechnologyIcon } from './TechnologyIcon'
import { EvidenceImage, FlowRoute } from './CaseStudyMedia'
import { ProjectEvolution } from './ProjectEvolution'
import { ProjectPublicData } from './ProjectPublicData'

const standardTabs = [
  { id: 'overview', label: '문제와 목표' },
  { id: 'architecture', label: '서비스 구조' },
  { id: 'journey', label: '사용 흐름' },
  { id: 'contributions', label: '구현 기여' },
  { id: 'technologies', label: '전체 기술' },
] as const

type CaseTabId = (typeof standardTabs)[number]['id'] | 'evolution' | 'publicData'

export function ProjectCaseStudy({ project }: { project: Project }) {
  const study = project.caseStudy!
  const tabs: readonly { id: CaseTabId; label: string }[] = study.publicData
    ? [standardTabs[0], { id: 'publicData', label: '공공데이터' }, standardTabs[1], standardTabs[2], standardTabs[4], standardTabs[3]]
    : study.evolution
    ? [...standardTabs.slice(0, 3), standardTabs[4], { id: 'evolution', label: '기술 고도화' }, standardTabs[3]]
    : standardTabs
  const [activeTab, setActiveTab] = useState<CaseTabId>('overview')
  const [activeStep, setActiveStep] = useState(study.journey[0]?.id)
  const tabRefs = useRef<Partial<Record<CaseTabId, HTMLButtonElement | null>>>({})
  const step = study.journey.find((item) => item.id === activeStep) ?? study.journey[0]

  const activateTab = (id: CaseTabId) => {
    setActiveTab(id)
    const button = tabRefs.current[id]
    button?.focus({ preventScroll: true })
    button?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' })
  }

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | undefined
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = tabs.length - 1
    if (next === undefined) return
    event.preventDefault()
    activateTab(tabs[next].id)
  }

  return (
    <div className="detailed-case-study" data-project={project.id}>
      <div className="case-tabs" role="tablist" aria-label={`${project.title} 상세 내용`}
        style={{ '--case-tab-count': tabs.length } as CSSProperties}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[tab.id] = element
            }}
            type="button"
            id={`${project.id}-tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${project.id}-panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => activateTab(tab.id)}
            onKeyDown={(event) => onTabKey(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, tabIndex) => (
        <div
          key={tab.id}
          id={`${project.id}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${project.id}-tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
          className="case-tab-panel"
        >
          {activeTab === tab.id && tab.id === 'overview' && (
            <>
              <div className="case-panel-intro">
                <p className="eyebrow">01 / PROBLEM &amp; GOALS</p>
                <h3>{study.overview.headline}</h3>
                <p>{study.overview.audience}</p>
              </div>
              <section className="case-problems" aria-labelledby={`${project.id}-problems-title`}>
                <h4 id={`${project.id}-problems-title`}>어떤 문제에서 출발했나요?</h4>
                <div className="problem-grid">
                  {study.overview.problems.map((problem, index) => (
                    <article className="problem-card" key={problem.title}>
                      <span className="case-small-label" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h5>{problem.title}</h5>
                      <p>{problem.description}</p>
                    </article>
                  ))}
                </div>
              </section>
              <section className="case-objective" aria-labelledby={`${project.id}-objective-title`}>
                <p className="case-small-label">PROJECT OBJECTIVE</p>
                <h4 id={`${project.id}-objective-title`}>{study.overview.objective}</h4>
                <FlowRoute className="objective-route" steps={study.overview.flow} />
              </section>
              <section className="case-goals" aria-labelledby={`${project.id}-goals-title`}>
                <h4 id={`${project.id}-goals-title`}>{study.overview.goalsTitle}</h4>
                <dl className="goal-list">
                  {study.overview.goals.map((goal) => (
                    <div key={goal.title}>
                      <dt>{goal.title}</dt>
                      <dd>{goal.description}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <div className="case-overview-next">
                <button className="text-link" onClick={() => activateTab(study.publicData ? 'publicData' : 'architecture')}>
                  {study.publicData ? '공공데이터 살펴보기' : '서비스 구조 살펴보기'} <Icon name="right" size={16} />
                </button>
              </div>
            </>
          )}
          {activeTab === tab.id && tab.id === 'architecture' && (
            <>
              <div className="case-panel-intro">
                <p className="eyebrow">{String(tabIndex + 1).padStart(2, '0')} / SYSTEM ARCHITECTURE</p>
                <h3>{study.architecture.title}</h3>
                <p>{study.architecture.summary}</p>
              </div>
              {study.architecture.image && (
                <EvidenceImage image={study.architecture.image} />
              )}
              <div className="architecture-roles">
                {study.architecture.layers.map((layer, index) => (
                  <article className="architecture-role" key={layer.name}>
                    <span className="architecture-role-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4>{layer.name}</h4>
                      <p className="architecture-technology">{layer.technology}</p>
                      <p>{layer.description}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="execution-evidence">
                <p className="eyebrow">
                  <Icon name="check" size={15} />
                  {study.result.title}
                </p>
                <FlowRoute className="execution-route" steps={study.result.flow} />
                <p>{project.outcome}</p>
                <button
                  className="text-link"
                  onClick={() => {
                    activateTab('journey')
                    setActiveStep(
                      study.journey.find((item) => item.id === study.result.journeyStepId)?.id ??
                        study.journey[0]?.id,
                    )
                  }}
                >
                  사용 흐름 살펴보기
                  <Icon name="right" size={16} />
                </button>
              </div>
            </>
          )}
          {activeTab === tab.id && tab.id === 'journey' && (
            <>
              <div className="case-panel-intro">
                <p className="eyebrow">{String(tabIndex + 1).padStart(2, '0')} / PRODUCT WALKTHROUGH</p>
                <h3>{study.journeyIntro.title}</h3>
                <p>{study.journeyIntro.description}</p>
              </div>
              <div className="journey-layout">
                <div className="journey-steps" aria-label="기능별 화면 선택">
                  {study.journey.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveStep(item.id)}
                      aria-pressed={step?.id === item.id}
                      aria-controls="journey-stage"
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {item.title}
                      <Icon name="right" size={14} />
                    </button>
                  ))}
                </div>
                {step && (
                  <section
                    id="journey-stage"
                    className="journey-stage"
                    aria-labelledby={`journey-${step.id}`}
                  >
                    <p className="case-small-label">
                      STEP {String(study.journey.indexOf(step) + 1).padStart(2, '0')}
                    </p>
                    <h4 id={`journey-${step.id}`}>{step.title}</h4>
                    <p className="journey-description">{step.description}</p>
                    {step.images.map((item) => (
                      <EvidenceImage key={item.src} image={item} />
                    ))}
                  </section>
                )}
              </div>
            </>
          )}
          {activeTab === tab.id && tab.id === 'contributions' && (
            <>
              <div className="case-panel-intro">
                <p className="eyebrow">{String(tabIndex + 1).padStart(2, '0')} / {study.contributionScope === 'team' ? 'ROLE & IMPLEMENTATION' : 'MY CONTRIBUTION'}</p>
                <h3>{study.contributionScope === 'team' ? '프론트엔드 참여와 팀 구현' : '제가 맡은 일'}</h3>
                <p>{study.contributionIntro}</p>
              </div>
              <div className="case-problem">
                <span className="case-small-label">{study.contributionScope === 'team' ? 'IMPLEMENTATION CHALLENGE' : 'MY IMPLEMENTATION CHALLENGE'}</span>
                <h4>{study.implementationChallengeTitle}</h4>
                <p>{study.implementationChallenge}</p>
              </div>
              <FlowRoute className="contribution-flow" steps={study.contributionFlow} />
              <div className="contribution-list">
                {study.technicalContributions.map((item, index) => (
                  <article key={item.title}>
                    <span className="case-index">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
              <section className="case-reflection">
                <p className="case-small-label">{study.contributionScope === 'team' ? 'PROJECT RESULT' : 'WHAT I LEARNED'}</p>
                <h3>{study.contributionScope === 'team' ? '서비스로 연결한 결과' : '결과와 배운 점'}</h3>
                <p>{study.reflection}</p>
              </section>
              {study.improvements.length > 0 && <section className="case-improvements">
                <h4>다음으로 개선하고 싶은 것</h4>
                <ul>
                  {study.improvements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>}
            </>
          )}
          {activeTab === tab.id && tab.id === 'technologies' && (
            <>
              <div className="case-panel-intro">
                <p className="eyebrow">{String(tabIndex + 1).padStart(2, '0')} / TECHNOLOGY STACK</p>
                <h3>기술 스택</h3>
              </div>
              <div className="case-primary-stack">
                {project.stack.map((name) => (
                  <span key={name}>
                    <TechnologyIcon name={name} size={20} />
                    {name}
                  </span>
                ))}
              </div>
              <div className="technology-groups">
                {study.technologyGroups.map((group) => (
                  <section key={group.title}>
                    <h4>
                      {group.title}
                      <span>{String(group.items.length).padStart(2, '0')}</span>
                    </h4>
                    <dl>
                      {group.items.map((item) => (
                        <div className="technology-row" key={item.name}>
                          <dt>
                            <TechnologyIcon name={item.name} size={22} />
                            <span>{item.name}</span>
                          </dt>
                          <dd>{item.purpose}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
              </div>
            </>
          )}
          {activeTab === tab.id && tab.id === 'evolution' && study.evolution && (
            <ProjectEvolution study={study.evolution} onViewContribution={() => activateTab('contributions')} />
          )}
          {activeTab === tab.id && tab.id === 'publicData' && study.publicData && (
            <ProjectPublicData study={study.publicData} onViewJourney={() => activateTab('journey')} />
          )}
        </div>
      ))}
    </div>
  )
}
