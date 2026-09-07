import { profile } from '../data/portfolio'
import { Icon } from './Icon'
import { assetPath } from './ProjectCard'
import '../introduction.css'

export function Introduction() {
  return (
    <section id="top" className="introduction container" aria-labelledby="hero-title">
      <div id="about" className="intro-about" tabIndex={-1}>
        <header className="introduction-heading">
          <p className="eyebrow"><span>01</span> A LITTLE ABOUT ME</p>
          <h1 id="hero-title">{profile.headline[0]} <span>{profile.headline[1]}</span></h1>
        </header>
        <div className="introduction-grid">
          <div className="introduction-person">
            <img
              src={assetPath(profile.photo.src)}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              decoding="async"
            />
            <div className="introduction-identity">
              <p className="introduction-name">{profile.name}</p>
              <p className="introduction-english">{profile.englishName}</p>
              <p className="introduction-role">{profile.roleLabel}</p>
              <a className="introduction-github" href={profile.github} target="_blank" rel="noopener noreferrer">
                <Icon name="github" size={17} />
                {new URL(profile.github).pathname.slice(1)}
                <Icon name="arrow" size={13} />
              </a>
            </div>
          </div>
          <div className="introduction-story">
            {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}
