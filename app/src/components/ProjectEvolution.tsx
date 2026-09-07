import { useState } from 'react'
import type { ProjectCaseStudy } from '../data/portfolio'
import { EvidenceImage } from './CaseStudyMedia'
import { Icon } from './Icon'
import '../evolution.css'

export function ProjectEvolution({ study, onViewContribution }: {
  study: NonNullable<ProjectCaseStudy['evolution']>
  onViewContribution: () => void
}) {
  const [stageIndex, setStageIndex] = useState(0)
  const stage = study.stages[stageIndex]
  const evaluation = study.evaluation

  return (
    <>
      <div className="case-panel-intro">
        <p className="eyebrow">05 / SEARCH ENGINEERING</p>
        <h3>{study.title}</h3>
        <p>{study.description}</p>
      </div>
      <div className="evolution-stage-picker" role="group" aria-label="검색 고도화 과정 선택">
        {study.stages.map((item, index) => (
          <button key={item.id} onClick={() => setStageIndex(index)}
            aria-pressed={index === stageIndex} aria-controls="evolution-stage-content">
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item.title}
            <Icon name="right" size={14} />
          </button>
        ))}
      </div>
      {stage && (
        <section id="evolution-stage-content" className="evolution-stage-content"
          aria-labelledby={`evolution-${stage.id}`}>
          <h4 id={`evolution-${stage.id}`}>{stage.title}</h4>
          <dl className="evolution-narrative">
            <div><dt>발견한 문제</dt><dd>{stage.problem}</dd></div>
            <div><dt>적용한 변경</dt><dd>{stage.change}</dd></div>
            <div><dt>확인한 점</dt><dd>{stage.outcome}</dd></div>
          </dl>
          {stage.images.length > 0 && (
            <details className="presentation-evidence" key={stage.id}>
              <summary>발표 자료로 과정 살펴보기 <span>{stage.images.length}장</span></summary>
              {stage.images.map(image => <EvidenceImage key={image.src} image={image} />)}
            </details>
          )}
        </section>
      )}
      <section className="search-evaluation" aria-labelledby="search-evaluation-title">
        <p className="eyebrow">TEAM EXPERIMENT / PRESENTATION RESULTS</p>
        <h4 id="search-evaluation-title">{evaluation.title}</h4>
        <p className="evaluation-context">{evaluation.description}</p>
        <table className="metric-table" aria-label="발표 자료의 검색 성능 평가">
          <thead><tr><th scope="col">평가 지표</th><th scope="col">이전 버전</th><th scope="col">개선 버전</th></tr></thead>
          <tbody>
            {evaluation.metrics.map(metric => (
              <tr key={metric.name}>
                <th scope="row">{metric.name}</th>
                <td>
                  <span>{metric.before.toFixed(3)}</span>
                  <span className="metric-track" aria-hidden="true"><i style={{ width: `${metric.before * 100}%` }} /></span>
                </td>
                <td className="metric-after">
                  <span>{metric.after.toFixed(3)}</span>
                  <span className="metric-track" aria-hidden="true"><i style={{ width: `${metric.after * 100}%` }} /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="evaluation-note">{evaluation.note}</p>
        {evaluation.image && (
          <details className="presentation-evidence">
            <summary>성능 비교 발표 자료 보기 <span>1장</span></summary>
            <EvidenceImage image={evaluation.image} />
          </details>
        )}
      </section>
      <div className="case-overview-next">
        <button className="text-link" onClick={onViewContribution}>
          제가 맡은 구현 살펴보기 <Icon name="right" size={16} />
        </button>
      </div>
    </>
  )
}
