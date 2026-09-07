import type { ProjectCaseStudy } from '../data/portfolio'
import { EvidenceImage } from './CaseStudyMedia'
import { Icon } from './Icon'
import '../public-data.css'

export function ProjectPublicData({ study, onViewJourney }: {
  study: NonNullable<ProjectCaseStudy['publicData']>
  onViewJourney: () => void
}) {
  return (
    <div className="public-data-study">
      <div className="case-panel-intro">
        <p className="eyebrow">02 / PUBLIC DATA</p>
        <h3>{study.title}</h3>
        <p>{study.description}</p>
      </div>

      <div className="public-datasets">
        {study.datasets.map((dataset) => (
          <article className="public-dataset" key={dataset.name}>
            <div className="dataset-topline">
              <span className="dataset-category"><Icon name="database" size={16} />{dataset.category}</span>
              <span>PUBLIC DATA</span>
            </div>
            <h4>{dataset.name}</h4>
            <p className="dataset-description">{dataset.description}</p>
            <dl className="dataset-facts">
              <div className="dataset-size"><dt>원천 데이터 규모</dt><dd>{dataset.size}</dd></div>
              <div><dt>제공 데이터 갱신 주기</dt><dd>{dataset.updateCycle}</dd></div>
              <div><dt>제공·소관 기관</dt><dd>{dataset.provider}</dd></div>
            </dl>
            <div className="dataset-attributes">
              <h5>주요 속성</h5>
              <ul>{dataset.attributes.map((attribute) => <li key={attribute}>{attribute}</li>)}</ul>
            </div>
            <a className="text-link dataset-source" href={dataset.href} target="_blank" rel="noopener noreferrer"
              aria-label={`${dataset.category} 공공데이터 출처 (새 탭)`}>
              공공데이터 출처 <Icon name="arrow" size={15} />
            </a>
          </article>
        ))}
      </div>
      <p className="dataset-note">{study.note}</p>

      <section className="data-processing" aria-labelledby="data-processing-title">
        <div className="data-section-heading">
          <p className="case-small-label">FROM DATA TO SERVICE</p>
          <h4 id="data-processing-title">{study.processing.title}</h4>
          <p>{study.processing.description}</p>
        </div>
        <ol className="data-processing-steps">
          {study.processing.steps.map((step, index) => (
            <li key={step.title}>
              <span className="data-step-number">{String(index + 1).padStart(2, '0')}</span>
              <div><h5>{step.title}</h5><p>{step.description}</p></div>
            </li>
          ))}
        </ol>
        <table className="data-column-table">
          <caption>선택한 데이터가 화면에서 쓰이는 곳</caption>
          <thead><tr><th scope="col">필요한 열</th><th scope="col">서비스에서의 활용</th></tr></thead>
          <tbody>{study.processing.columns.map((column) => (
            <tr key={column.name}><th scope="row">{column.name}</th><td>{column.purpose}</td></tr>
          ))}</tbody>
        </table>
        {study.processing.image && <EvidenceImage image={study.processing.image} />}
      </section>

      <section className="data-integrations" aria-labelledby="data-integrations-title">
        <div className="data-section-heading">
          <p className="case-small-label">CONNECTED SERVICES</p>
          <h4 id="data-integrations-title">장소 정보에 필요한 기능을 더했습니다.</h4>
        </div>
        <div className="data-integration-grid">
          {study.integrations.map((integration) => (
            <article key={integration.name}>
              <p className="integration-source">{integration.source}</p>
              <h5>{integration.name}</h5>
              <p>{integration.description}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="case-overview-next">
        <button className="text-link" onClick={onViewJourney}>
          실제 서비스 화면 살펴보기 <Icon name="right" size={16} />
        </button>
      </div>
    </div>
  )
}
