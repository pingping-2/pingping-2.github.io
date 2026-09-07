import { useEffect, useRef } from 'react'
import type { Project } from '../data/portfolio'
import { Icon } from './Icon'
import { assetPath } from './ProjectCard'
import { ProjectCaseStudy } from './ProjectCaseStudy'

export function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = ref.current!
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className={`project-dialog${project.caseStudy ? ' has-case-study' : ''}`}
      aria-labelledby="project-dialog-title"
      aria-describedby="project-dialog-summary"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === ref.current) {
          const rect = ref.current.getBoundingClientRect()
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose()
        }
      }}
    >
      <div className="dialog-top">
        <span className="eyebrow">PROJECT {project.number} / CASE STUDY</span>
        <button
          ref={closeRef}
          className="icon-button dialog-close"
          onClick={onClose}
          aria-label="프로젝트 상세 닫기"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="dialog-body">
        <p className="dialog-category">{project.category}</p>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p id="project-dialog-summary" className="dialog-summary">
          {project.summary}
        </p>
        <dl className="project-facts">
          {project.period && <div>
            <dt>진행 기간</dt>
            <dd>{project.period}</dd>
          </div>}
          <div>
            <dt>프로젝트 구성</dt>
            <dd>{project.team}</dd>
          </div>
          <div>
            <dt>담당 역할</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>
        {project.caseStudy ? (
          <ProjectCaseStudy project={project} />
        ) : (
          <>
            <figure className="dialog-figure">
              <img
                src={assetPath(project.image)}
                alt={project.imageAlt}
                width={project.imageWidth}
                height={project.imageHeight}
                decoding="async"
              />
              <figcaption>{project.imageAlt}</figcaption>
            </figure>
            <section className="case-section">
              <span className="case-index">01</span>
              <div>
                <h3>어떤 문제를 해결했나요?</h3>
                <p>{project.problem}</p>
              </div>
            </section>
            <section className="case-section">
              <span className="case-index">02</span>
              <div>
                <h3>제가 맡은 일</h3>
                <ul>
                  {project.contributions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="case-section">
              <span className="case-index">03</span>
              <div>
                <h3>서비스의 주요 기능</h3>
                <ul>
                  {project.features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="case-section">
              <span className="case-index">04</span>
              <div>
                <h3>결과와 배운 점</h3>
                <p>{project.outcome}</p>
              </div>
            </section>
            {project.gallery?.map((item) => (
              <figure className="dialog-figure" key={item.src}>
                <img
                  src={assetPath(item.src)}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  width={item.width}
                  height={item.height}
                />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
            <div className="dialog-stack">
              <p className="eyebrow">PROJECT STACK</p>
              <div className="tag-list">
                {project.stack.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="dialog-links">
          {project.github && (
            <a
              className="button button-primary"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size={18} /> GitHub 저장소 <Icon name="arrow" size={16} />
            </a>
          )}
          {project.demo && (
            <a
              className="button button-secondary"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              데모 보기 <Icon name="arrow" size={16} />
            </a>
          )}
        </div>
      </div>
    </dialog>
  )
}
