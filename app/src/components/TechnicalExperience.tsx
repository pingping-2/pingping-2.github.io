import { projects } from '../data/portfolio'
import type { Project, TechnicalSkill } from '../data/portfolio'
import { Icon } from './Icon'
import '../technical-experience.css'

export function TechnicalExperience({ skills, onOpenProject }: {
  skills: TechnicalSkill[]
  onOpenProject: (project: Project) => void
}) {
  return (
    <div className="technical-experience" data-reveal>
      <div className="technical-experience-labels" aria-hidden="true">
        <span>기술</span><span>사용 경험</span><span>프로젝트</span>
      </div>
      {skills.map((skill) => (
        <article className="technical-experience-row" key={skill.id} aria-labelledby={`skill-${skill.id}`}>
          <div className="technical-experience-title">
            <p>{skill.category}</p>
            <h3 id={`skill-${skill.id}`}>{skill.items.join(' · ')}</h3>
          </div>
          <ul className="technical-experience-tasks">
            {skill.tasks.map((task) => <li key={task}>{task}</li>)}
          </ul>
          <div className="technical-experience-projects">
            {skill.projectIds.map((id) => {
              const project = projects.find((item) => item.id === id)
              return project && (
                <button key={id} type="button" onClick={() => onOpenProject(project)}
                  aria-label={`${project.title} 구현 내용 보기`}>
                  {project.title} <Icon name="arrow" size={13} />
                </button>
              )
            })}
          </div>
        </article>
      ))}
    </div>
  )
}
