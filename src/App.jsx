import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import Topography from './components/Topography'
import Projects from './components/Projects'
import './App.css'

function App() {
  const [showHero, setShowHero] = useState(false)
  const [terminalLines, setTerminalLines] = useState({
    first: '',
    blue: '',
    second: '',
    third: '',
    green: '',
  })

  useEffect(() => {
    const transitionTimer = window.setTimeout(() => setShowHero(true), 5600)
    const timers = [transitionTimer]
    const typeLine = (lineName, text, delay) => {
      const startTimer = window.setTimeout(() => {
        let characterIndex = 0
        const typeTimer = window.setInterval(() => {
          characterIndex += 1
          setTerminalLines((currentLines) => ({
            ...currentLines,
            [lineName]: text.slice(0, characterIndex),
          }))
          if (characterIndex >= text.length) window.clearInterval(typeTimer)
        }, 45)
        timers.push(typeTimer)
      }, delay)
      timers.push(startTimer)
    }

    typeLine('first', '$ ls', 0)
    typeLine('second', '$ cd Documents', 1600)
    typeLine('third', '$ pwd', 2400)
    const blueTimer = window.setTimeout(() => {
      setTerminalLines((currentLines) => ({ ...currentLines, blue: "Let's build your website!" }))
    }, 800)
    const greenTimer = window.setTimeout(() => {
      setTerminalLines((currentLines) => ({ ...currentLines, green: '/home/user/Documents' }))
    }, 3200)
    timers.push(blueTimer, greenTimer)

    return () => timers.forEach((timer) => {
      window.clearTimeout(timer)
      window.clearInterval(timer)
    })
  }, [])

  return (
    <main className="app-shell">
      <section className={`terminal-intro ${showHero ? 'terminal-intro--hidden' : ''}`} aria-label="Terminal introduction">
        <div className="terminal-intro__window">
          <div className="terminal-intro__bar" aria-hidden="true">
            <span className="terminal-intro__dot" />
            <span className="terminal-intro__dot" />
            <span className="terminal-intro__dot" />
          </div>
          <div className="terminal-intro__body">
            <span className="terminal-line">{terminalLines.first}</span>
            <span className={`terminal-line terminal-line--output terminal-line--blue ${terminalLines.blue ? 'terminal-line--visible' : ''}`}>{terminalLines.blue}</span>
            <span className="terminal-line">{terminalLines.second}</span>
            <span className="terminal-line">{terminalLines.third}</span>
            <span className={`terminal-line terminal-line--output terminal-line--green ${terminalLines.green ? 'terminal-line--visible' : ''}`}>{terminalLines.green}</span>
          </div>
        </div>
      </section>

      <main className={`topography-hero ${showHero ? 'topography-hero--visible' : ''}`}>
        <div className="dot-background" aria-hidden="true" />

        <div className="topography-hero__background" aria-hidden="true">
          <Topography
            lowColor="#7c3aed"
            midColor="#22d3ee"
            highColor="#FFFFFF"
            speed={0.35}
            morphAmount={3}
            morphSpeed={0.05}
            bands={2}
            thickness={0.01}
            scale={2}
            pixelSize={1}
            glow={0.5}
            colorMode="elevation"
            contrast={3}
            brightness={1}
            fillBands={false}
            opacity={1}
            grain
            grainIntensity={0.05}
            mouseInteraction
            mouseRadius={0.3}
            mouseStrength={0.4}
          />
        </div>

        <section className="topography-hero__content" aria-labelledby="hero-title">
          <p className="topography-hero__eyebrow">AV DESIGN STUDIO</p>
          <h1 id="hero-title">
            Grow your business
          </h1>
          <p className="topography-hero__description">
            Digital experiences with motion, clarity, and a little electricity.
          </p>

          <a className="scroll-cue" href="#projects">
            Scroll to see more
            <ArrowDown size={20} aria-hidden="true" />
          </a>
        </section>

      </main>

      <Projects />

      <nav className="site-nav" aria-label="Main">
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </main>
    )
}

export default App
