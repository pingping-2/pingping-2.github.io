import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { profile } from '../data/portfolio'

const navigation = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'experience', label: 'Experience', hidden: true },
  { id: 'contact', label: 'Contact', hidden: true },
]

export function Header() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const nav = useRef<HTMLElement>(null)

  useEffect(() => {
    let pending = false
    const update = () => {
      const threshold = Math.min(window.innerHeight * 0.36, 260)
      const sections = navigation
        .map(({ id }) => document.getElementById(id))
        .filter((element): element is HTMLElement => !!element && !element.hidden)
        .sort((a, b) => a.offsetTop - b.offsetTop)
      const section = sections
        .filter((element) => element.getBoundingClientRect().top <= threshold)
        .at(-1)
      const atBottom =
        Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 4
      setActive(atBottom ? sections.at(-1)?.id || '' : section?.id || '')
      pending = false
    }
    const scroll = () => {
      if (!pending) {
        pending = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', scroll, { passive: true })
    return () => window.removeEventListener('scroll', scroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    const onOutside = (event: PointerEvent) => {
      if (
        !nav.current?.contains(event.target as Node) &&
        !toggle.current?.contains(event.target as Node)
      )
        setOpen(false)
    }
    const media = window.matchMedia('(min-width: 801px)')
    const onResize = () => {
      if (media.matches) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    media.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
      media.removeEventListener('change', onResize)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#top"
          className="wordmark"
          aria-label={`${profile.englishName}. PORTFOLIO — ${profile.name} 포트폴리오, 처음으로`}
        >
          {profile.englishName}
          <span className="wordmark-dot">.</span>{' '}
          <span className="wordmark-caption">PORTFOLIO</span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle icon-button"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
        <nav
          ref={nav}
          id="main-navigation"
          className={`main-navigation${open ? ' is-open' : ''}`}
          aria-label="주요 메뉴"
        >
          {navigation.filter((item) => !item.hidden).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              onClick={() => {
                setOpen(false)
                const target = document.getElementById(item.id)
                target?.focus({ preventScroll: true })
              }}
              className={item.id === 'contact' ? 'nav-contact' : ''}
            >
              {item.label}
              {item.id === 'contact' && <Icon name="arrow" size={14} />}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
