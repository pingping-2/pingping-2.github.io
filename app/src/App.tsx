import { useEffect, useState } from 'react'
import { profile, projects, skills, experience, featuredTechnologies } from './data/portfolio'
import type { Project } from './data/portfolio'
import { Header } from './components/Header'
import { Icon } from './components/Icon'
import { Introduction } from './components/Introduction'
import { SectionHeading } from './components/SectionHeading'
import { ProjectCard } from './components/ProjectCard'
import { ProjectDialog } from './components/ProjectDialog'
import { Contact } from './components/Contact'
import { TechnologyIcon } from './components/TechnologyIcon'
import { TechnicalExperience } from './components/TechnicalExperience'

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.08 },
    )
    document.querySelectorAll('[data-reveal]').forEach((element) => {
      element.classList.add('reveal-ready')
      observer.observe(element)
    })
    return () => {
      observer.disconnect()
      document
        .querySelectorAll('.reveal-ready')
        .forEach((element) => element.classList.remove('reveal-ready'))
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Introduction />
        <section
          id="skills"
          className="section container skills-section"
          tabIndex={-1}
          aria-label="기술과 도구"
        >
          <div data-reveal>
            <SectionHeading number="02" label="TECH STACK" title="사용 기술" />
          </div>
          <ul className="featured-technologies" aria-label="주요 사용 기술" data-reveal>
            {featuredTechnologies.map((name) => (
              <li key={name}>
                <TechnologyIcon name={name} size={27} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
          <TechnicalExperience skills={skills} onOpenProject={setSelectedProject} />
        </section>
        <section
          id="projects"
          className="section container projects-section"
          tabIndex={-1}
          aria-label="대표 프로젝트"
        >
          <div data-reveal>
            <SectionHeading number="03" label="PORTFOLIO" title="포트폴리오" />
          </div>
          <div className="projects-grid" data-reveal>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
            ))}
          </div>
        </section>
        <section
          id="experience"
          hidden
          className="section experience-section"
          tabIndex={-1}
          aria-label="프로젝트와 학력"
        >
          <div className="container experience-grid">
            <div data-reveal>
              <SectionHeading number="04" label="EXPERIENCE & EDUCATION" title="경험 및 학력" />
              <div className="experience-note">
                <Icon name="book" size={20} />
                <span>
                  {profile.education.major}
                  <br />
                  {profile.education.school}
                </span>
              </div>
            </div>
            <div className="timeline" data-reveal>
              {experience.map((item, index) => (
                <article className="timeline-item" key={`${item.title}-${index}`}>
                  <span className="timeline-dot" />
                  <div className="timeline-top">
                    <span className="timeline-period">{item.period}</span>
                    <span className={`timeline-type ${item.type}`}>
                      {item.type === 'education' ? 'EDUCATION' : 'TEAM PROJECT'}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="timeline-organization">{item.organization}</p>
                  <p className="timeline-description">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <a
            href="#top"
            className="wordmark"
            aria-label={`${profile.englishName}. — ${profile.name} 포트폴리오, 처음으로`}
          >
            {profile.englishName}
            <span className="wordmark-dot">.</span>
          </a>
          <p>
            © {new Date().getFullYear()} {profile.englishName}. Built with intention.
          </p>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
              <Icon name="arrow" size={13} />
            </a>
            <a href={`mailto:${profile.email}`}>
              Email
              <Icon name="arrow" size={13} />
            </a>
            <a href="#top" className="back-top" aria-label="페이지 상단으로 이동">
              <Icon name="up" size={17} />
            </a>
          </div>
        </div>
      </footer>
      {selectedProject && (
        <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  )
}
