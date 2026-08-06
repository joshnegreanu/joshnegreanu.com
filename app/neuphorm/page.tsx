'use client'

import { useEffect } from 'react'
import Nav from '../Nav'
import CursorCircle from './CursorCircle'
import './neuphorm.css'

export default function NeuphormPage() {
  useEffect(() => {
    document.documentElement.classList.add('dark-mode')
    return () => document.documentElement.classList.remove('dark-mode')
  }, [])

  return <div className="neuphorm-page"><Nav /><main className="neuphorm-content"><h1>NEU<br />PHO<br />RM.</h1><p>Front facing AI agents and immersive adaptive visualizations for architecture firms, coming soon.<br /><br />Check for updates on <a href="https://www.linkedin.com/company/couveai" target="_blank" rel="noreferrer" className="normal_link">LinkedIn</a>.</p></main><CursorCircle /><div className="footer-spacer" /><footer className="botnav"><div className="footer_text">WEBSITE CODE IS ON GITHUB. LINK IS ABOVE. © 2026</div><a className="footer_link" href="mailto:joshua.negreanu@gmail.com">joshua.negreanu@gmail.com</a></footer></div>
}
