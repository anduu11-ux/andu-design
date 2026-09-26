import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, ChevronRight, Copy, MessageCircle, Phone } from 'lucide-react'
import Topography from './Topography'
import Projects from './Projects'
import homeShot from '../assets/mc-fiduciaire/home.webp'

const CONTACT_EMAIL = 'bucatariualexandru11@gmail.com'

// the email opens with a subject and three prompts, so nobody stares at a blank message
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('A website for my business')}&body=${encodeURIComponent(
  'Hi,\r\n\r\nMy business: \r\nWhat I need: \r\nLanguages: \r\n',
)}`

// WhatsApp opens the chat with a first line already typed, like the email does
const WHATSAPP = `https://wa.me/40725791791?text=${encodeURIComponent('Hi! I’m interested in a website for my business.')}`

const COPY_LABEL = { idle: 'Copy', copied: 'Copied', failed: 'Press Ctrl+C' }
const COPY_ANNOUNCEMENT = { idle: '', copied: 'Email address copied', failed: 'Address selected. Press Control and C to copy it.' }

// no clipboard access (http, blocked permission): select the address instead so Ctrl+C still works
function CopyEmail({ email }) {
  const [state, setState] = useState('idle')
  const addressRef = useRef(null)

  useEffect(() => {
    if (state === 'idle') return
    const timer = setTimeout(() => setState('idle'), 2500)
    return () => clearTimeout(timer)
  }, [state])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setState('copied')
    } catch {
      getSelection().selectAllChildren(addressRef.current)
      setState('failed')
    }
  }

  return (
    <div className="email-copy">
      <a ref={addressRef} href={MAILTO}>{email}</a>
      <button type="button" onClick={copy} data-state={state} aria-label={state === 'idle' ? 'Copy email address' : undefined}>
        {state === 'copied' ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {COPY_LABEL[state]}
      </button>
      <span className="sr-only" aria-live="polite">{COPY_ANNOUNCEMENT[state]}</span>
    </div>
  )
}

// v2 owns its copies of Topography and Projects on purpose, so nothing here can change v1 (src/App.jsx + src/components)
export default function App() {
  return (
    <div className="app-shell" id="top">
      <nav className="site-nav" aria-label="Main">
        <a className="site-nav__brand" href="#top">andu design</a>
        <a className="site-nav__projects" href="#projects">Projects</a>
        <a className="btn" href="#contact">
          Contact <ArrowRight size={14} aria-hidden="true" />
        </a>
      </nav>

      <main>
        <div className="topography-hero">
          <div className="aurora" aria-hidden="true" />

          <div className="topography-hero__background" aria-hidden="true">
            {/* colours match --glow-violet / --glow-cyan in index.css; glow and opacity are turned down so the work and the people lead */}
            <Topography lowColor="#7c3aed" midColor="#22d3ee" scale={2} glow={0.3} opacity={0.75} />
          </div>

          <section className="topography-hero__content" aria-labelledby="hero-title">
            <div>
              <h1 id="hero-title" className="rise" style={{ '--i': 0 }}>
                <span>Websites that</span> grow your business
              </h1>
              <p className="topography-hero__description rise" style={{ '--i': 1 }}>
                We design and build websites for real businesses: multilingual, clear, and made to bring in clients.
              </p>
              <div className="topography-hero__actions rise" style={{ '--i': 2 }}>
                <a className="btn" href="#projects">See our work</a>
                <a className="text-link" href="#contact">
                  Contact us <ChevronRight size={13} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>
            </div>

            <figure className="hero-work rise" style={{ '--i': 2 }}>
              <img
                className="shot"
                src={homeShot}
                alt="MC Fiduciaire's homepage: the headline “Your finances in trusted hands” next to a photo of the firm's team"
                width="1280"
                height="800"
                fetchPriority="high"
              />
              <figcaption>A site we built for MC Fiduciaire, an accounting firm with 500+ clients.</figcaption>
            </figure>
          </section>
        </div>

        <Projects />

        <section id="contact" className="close" aria-labelledby="close-title">
          <h2 id="close-title">Let’s build <span>your website.</span></h2>
          <p className="close__lead">Tell us about your business and what it needs.</p>

          <div className="close__actions">
            <a className="btn" href={MAILTO}>Email us</a>
            <CopyEmail email={CONTACT_EMAIL} />
          </div>

          <div className="close__channels">
            <a className="text-link" href="tel:+32465261035">
              <Phone size={14} aria-hidden="true" /> Call +32 465 26 10 35
            </a>
            <a className="text-link" href={WHATSAPP} target="_blank" rel="noreferrer">
              <MessageCircle size={14} aria-hidden="true" /> WhatsApp +40 725 791 791
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>andu design</span>
        <nav className="site-footer__legal" aria-label="Legal">
          <a href="v2-privacy.html">Privacy</a>
          <a href="v2-cookies.html">Cookies</a>
        </nav>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
