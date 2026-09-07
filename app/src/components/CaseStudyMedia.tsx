import { Fragment } from 'react'
import type { CaseStudyImage } from '../data/portfolio'
import { Icon } from './Icon'
import { assetPath } from './ProjectCard'

export function EvidenceImage({ image }: { image: CaseStudyImage }) {
  return (
    <figure className="evidence-figure">
      <div className="evidence-image">
        <img src={assetPath(image.src)} alt={image.alt} width={image.width} height={image.height}
          loading="lazy" decoding="async" />
      </div>
      <figcaption>
        <p>{image.caption}</p>
        <a href={assetPath(image.src)} target="_blank" rel="noopener noreferrer"
          aria-label={`${image.alt} 원본 보기 (새 탭)`}>
          원본 보기 <Icon name="arrow" size={13} />
        </a>
      </figcaption>
    </figure>
  )
}

export function FlowRoute({ steps, className }: { steps: string[]; className: string }) {
  return (
    <div className={className} role="group" aria-label={steps.join(' → ')}>
      {steps.map((step, index) => (
        <Fragment key={`${index}-${step}`}>
          {index > 0 && <Icon name="right" size={16} />}
          <span>{step}</span>
        </Fragment>
      ))}
    </div>
  )
}
