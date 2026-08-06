'use client'

import { useEffect, useRef } from 'react'

export default function CursorCircle() {
  const circleRef = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return
    const mouse = { x: innerWidth / 2, y: innerHeight / 2 }
    const previous = { ...mouse }
    const position = { ...mouse }
    let scale = 0
    let angle = 0
    const onMove = (event: MouseEvent) => { mouse.x = event.clientX; mouse.y = event.clientY }
    const tick = () => {
      position.x += (mouse.x - position.x) * 0.08
      position.y += (mouse.y - position.y) * 0.08
      circle.style.left = `${position.x - 120}px`
      circle.style.top = `${position.y - 120}px`
      const dx = mouse.x - previous.x; const dy = mouse.y - previous.y
      previous.x = mouse.x; previous.y = mouse.y
      const velocity = Math.min(Math.hypot(dx, dy), 150)
      scale += ((velocity / 150) * 0.5 - scale) * 0.08
      if (velocity > 2) angle = Math.atan2(dy, dx)
      circle.style.transform = `rotate(${angle}rad) scale(${1 + 5 * scale}, ${1 + 2.5 * scale})`
      requestAnimationFrame(tick)
    }
    addEventListener('mousemove', onMove); const frame = requestAnimationFrame(tick)
    return () => { removeEventListener('mousemove', onMove); cancelAnimationFrame(frame) }
  }, [])
  return <svg ref={circleRef} className="neuphorm-circle" viewBox="0 0 700 700" aria-hidden="true"><defs><radialGradient id="neuphorm-gradient" r="1.1"><stop offset="0%" stopColor="#000" /><stop offset="50%" stopColor="#f8f6ee" /><stop offset="100%" stopColor="#111" /></radialGradient><filter id="neuphorm-noise"><feTurbulence type="fractalNoise" baseFrequency=".42" numOctaves="2" seed="2" /><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncR type="linear" slope="3" /><feFuncG type="linear" slope="3" /><feFuncB type="linear" slope="3" /></feComponentTransfer></filter></defs><rect width="100%" height="100%" fill="url(#neuphorm-gradient)" /><rect width="100%" height="100%" fill="transparent" filter="url(#neuphorm-noise)" opacity=".75" /></svg>
}
