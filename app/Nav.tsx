'use client'

import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  return <>
    <nav className="topnav">
      <a href="/" className="top_nav nav-home">JOSH NEGREANU</a>
      <button type="button" className="hamburger-btn" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
    </nav>
    <div className={`nav-links${open ? ' nav-open' : ''}`}>
      <a href="/neuphorm/" className="top_nav" onClick={() => setOpen(false)}>NEUPHORM</a>
      <a href="/chat/" className="top_nav" onClick={() => setOpen(false)}>JOSHGPT</a>
      <a href="/files/resume.pdf" target="_blank" rel="noreferrer" className="top_nav">RESUME</a>
      <a href="https://linkedin.com/in/joshnegreanu/" target="_blank" rel="noreferrer" className="top_nav">LINKEDIN</a>
      <a href="https://github.com/JoshNegreanu" target="_blank" rel="noreferrer" className="top_nav">GITHUB</a>
      <a href="https://linktr.ee/joshnegreanu" target="_blank" rel="noreferrer" className="top_nav">SOCIALS</a>
    </div>
  </>
}
