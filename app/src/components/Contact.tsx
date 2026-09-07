import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import { Icon } from './Icon'

export function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    clearTimeout(timer.current)
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(profile.email)
      setCopyState('success')
    } catch {
      setCopyState('error')
    }
    timer.current = setTimeout(() => setCopyState('idle'), 4500)
  }

  return (
    <section id="contact" hidden className="contact-section" tabIndex={-1} aria-labelledby="contact-title">
      <div className="container contact-inner">
        <div className="contact-top">
          <p className="eyebrow">
            <span>05</span>GET IN TOUCH
          </p>
        </div>
        <div className="contact-main">
          <div>
            <h2 id="contact-title">연락처</h2>
          </div>
          <a
            className="contact-circle"
            href={`mailto:${profile.email}`}
            aria-label={`${profile.name}에게 이메일 보내기`}
          >
            <Icon name="arrow" size={42} />
          </a>
        </div>
        <div className="contact-bottom">
          <div className="contact-email-row">
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button className="copy-button" onClick={copy} aria-label="이메일 주소 복사">
              <Icon name={copyState === 'success' ? 'check' : 'copy'} size={18} />
              <span>{copyState === 'success' ? '복사 완료' : '주소 복사'}</span>
            </button>
            <span className="copy-status" role="status">
              {copyState === 'success'
                ? '이메일 주소를 복사했습니다.'
                : copyState === 'error'
                  ? '주소를 선택해 복사하거나 이메일 링크를 이용해 주세요.'
                  : ''}
            </span>
          </div>
          <a
            className="contact-github"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" size={19} />
            GitHub
            <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
