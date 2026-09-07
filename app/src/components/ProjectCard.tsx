import type { Project } from '../data/portfolio'
import { Icon } from './Icon'

export function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  return (
    <article className={`project-card project-${project.accent}`} data-project={project.id}>
      <div className="project-open">
        <div className="project-art">
          <div className="project-art-top">
            <span className="project-featured">
              <span />
              {project.featured ? 'FEATURED PROJECT' : 'SELECTED PROJECT'}
            </span>
            <span>{project.year}</span>
          </div>
          <div className="project-brand">
            <span className={`project-logo ${project.id}`} aria-hidden="true">
              {project.id === 'flowify' ? (
                <>
                  <i />
                  <i />
                  <i />
                </>
              ) : (
                <Icon name={project.id === 'carvery' ? 'car' : 'layers'} size={28} />
              )}
            </span>
            <span>{project.title}</span>
          </div>
          <p className="project-art-subtitle">{project.subtitle}</p>
          <div className="project-screenshot">
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <i>{project.title.toLowerCase()} / workspace</i>
            </div>
            <img
              src={assetPath(project.image)}
              alt={project.imageAlt}
              width={project.imageWidth}
              height={project.imageHeight}
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="project-view">
            <Icon name="arrow" size={23} />
          </span>
        </div>
        <div className="project-heading">
          <div className="project-category">
            {project.number} <span /> {project.category}
          </div>
          <h3>
            <button
              className="project-title-button"
              onClick={() => onOpen(project)}
              aria-label={`${project.title} 프로젝트 상세 보기`}
            >
              {project.title}
              <Icon name="arrow" size={24} />
            </button>
          </h3>
          <p>{project.summary}</p>
        </div>
      </div>
      <div className="project-card-bottom">
        <div className="tag-list">
          {project.stack.slice(0, 4).map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="project-card-links">
          <button className="text-link" onClick={() => onOpen(project)}>
            상세 보기 <Icon name="right" size={16} />
          </button>
          {project.github && (
            <a
              className="project-github"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub 저장소 (새 탭)`}
            >
              <Icon name="github" size={17} /> GitHub <Icon name="arrow" size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
