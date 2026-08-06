'use client'

import { useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import Nav from '../Nav'

const API_BASE = 'https://joshua-negreanu--joshgpt-joshgptservice-web.modal.run'
const greetings = ['Hello there.', 'Greetings.', 'Ask me anything.', 'Good to see you.', 'Hey there.', "What's up?", "What's new?", 'How are you?']

type Message = { role: 'user' | 'bot' | 'typing'; text: string }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [mode, setMode] = useState('conversational')
  const [input, setInput] = useState('')
  const [started, setStarted] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [greeting, setGreeting] = useState('Hello there.')
  const sessionId = useRef<string>('')
  const userScrolledUp = useRef(false)

  useEffect(() => {
    sessionId.current = crypto.randomUUID()
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)])
    const interval = window.setInterval(() => setGreeting(current => greetings[(greetings.indexOf(current) + 1) % greetings.length]), 10000)
    const onScroll = () => { userScrolledUp.current = window.innerHeight + window.scrollY < document.body.scrollHeight - 100 }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.clearInterval(interval); window.removeEventListener('scroll', onScroll); fetch(`${API_BASE}/session/${sessionId.current}`, { method: 'DELETE', keepalive: true }).catch(() => {}) }
  }, [])

  useEffect(() => {
    document.body.classList.add('chat-body')
    document.body.classList.toggle('chat-started', started)
    return () => { document.body.classList.remove('chat-body', 'chat-started') }
  }, [started])

  useEffect(() => {
    if (!userScrolledUp.current) window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })
  }, [messages])

  async function sendMessage() {
    const text = input.trim()
    if (!text || generating) return
    setStarted(true); setInput(''); setMessages(current => [...current, { role: 'user', text }, { role: 'typing', text: '' }]); setGenerating(true)
    try {
      const response = await fetch(`${API_BASE}/chat/stream`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, session_id: sessionId.current, mode }) })
      if (!response.ok || !response.body) throw new Error(`Server error: ${response.status}`)
      setMessages(current => [...current.filter(message => message.role !== 'typing'), { role: 'bot', text: '' }])
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = ''; let rawText = ''
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        buffer += decoder.decode(value, { stream: true }); const lines = buffer.split('\n'); buffer = lines.pop() ?? ''
        for (const line of lines) if (line.startsWith('data: ')) { rawText += JSON.parse(line.slice(6)); setMessages(current => { const next = [...current]; next[next.length - 1] = { role: 'bot', text: rawText }; return next }) }
      }
    } catch (error) { console.error(error); setMessages(current => [...current.filter(message => message.role !== 'typing'), { role: 'bot', text: 'Sorry, I appear to not be online. Please try again later.' }]) }
    finally { setGenerating(false) }
  }

  return <div className={`chat-shell${started ? ' chat-started' : ''}`}><Nav /><main className="chat-page"><div className="chat-messages">
    {!started && <div className="greeting-card"><div className="greeting-title">{greeting}</div><div className="greeting-sub">JoshGPT is an experimental and small-scale personal project; it makes frequent errors and should not be used for professional purposes. You can read <a href="/about-joshgpt/" className="normal_link" target="_blank">updates</a> on the project and view the open-source code on <a className="normal_link" href="https://github.com/joshgpt" target="_blank">Github</a>.</div><div className="mode-selector">{['conversational', 'scholar', 'creative'].map(option => <button type="button" key={option} className={`mode-btn${mode === option ? ' mode-btn--active' : ''}`} onClick={() => setMode(option)}>{option[0].toUpperCase() + option.slice(1)}</button>)}</div></div>}
    {messages.map((message, index) => message.role === 'typing' ? <div className="message message-typing" key={index}><svg className="scribble-svg" viewBox="0 0 80 20" fill="none"><path className="scribble-path" d="M2,12 C5,4 9,18 13,11 C17,4 21,17 26,10 C31,3 35,18 40,10 C45,3 49,17 54,10 C59,3 63,18 68,11 C72,4 76,16 78,10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div> : <div key={index} className={`message message-${message.role}`}>{message.role === 'bot' ? <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(message.text) as string) }} /> : message.text}</div>)}
  </div><div className="chat-input-bar"><div className="chat-input-inner"><textarea className="chat-input" value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void sendMessage() } }} placeholder="How can I maybe help you?" rows={1} aria-label="Message input" /><button type="button" className="chat-send-btn" disabled={!input.trim() || generating} onClick={() => void sendMessage()} aria-label="Send message"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button></div><div className="input-disclaimer">JoshGPT is an experimental project and should not be used for production purposes.</div></div></main></div>
}
