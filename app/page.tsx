'use client'

import { useEffect } from 'react'
import Nav from './Nav'

type SectionProps = { title: string; subtitle: React.ReactNode; reverse?: boolean; children: React.ReactNode }
function Section({ title, subtitle, reverse, children }: SectionProps) {
  return <section className={`section-row${reverse ? ' section-row--reverse' : ''}`}>
    <div className="section-label"><div className="label-title">{title}</div><div className="label-sub">{subtitle}</div></div>
    <div className="section-entries">{children}</div>
  </section>
}
function Entry({ title, children }: { title: string; children: React.ReactNode }) {
  return <><div className="entry-title">{title}</div><div className="entry-desc">{children}</div></>
}
const link = (href: string, text: string) => <a href={href} target="_blank" rel="noreferrer" className="normal_link">{text}</a>

export default function Home() {
  useEffect(() => {
    document.body.classList.remove('chat-body', 'chat-started')
  }, [])

  return <><Nav /><main>
    <section className="intro-section"><div className="intro-text">I am a passionate AI PhD student and engineer focused on deep multimodal models and generative frameworks for natural language processing and robotics.<br /><br />My experience spans deep model implementation and training, under-the-hood knowledge and research, as well as pipeline integration. My research involves applications of reinforcement learning for the next generation of language models.<br /><br /><div>Please feel free to <a className="normal_link" href="#research">view my most recent work</a>.</div></div><div className="intro-label">AI researcher &amp; developer for NLP, decision making, and robotics.</div></section>
    <Section title="Research" subtitle={<>Diffusion LLMs,<br />Bandits</>}><Entry title="Reinforcement Learning for Diffusion LLMs">Investigating the use of reinforcement learning to improve remasking policies for MDLMs for reasoning and agentic behavior. Under the mentorship of {link('https://huazhengwang.github.io', 'Huazheng Wang')}.</Entry><Entry title="Attacks on Stochastic Dueling Bandits">We provide a mathematical framework for reward poisoning on stochastic dueling bandits algorithms, proving effective spoofing with sublinear cost bounds and forced linear regret. Paper available on {link('https://ir.library.oregonstate.edu/concern/honors_college_theses/4b29bg040?locale=en', 'OSU Archives')}, code available on {link('https://github.com/joshnegreanu/attacks-on-stochastic-dueling-bandits', 'Github')}.<br /> Under the mentorship of {link('https://huazhengwang.github.io', 'Huazheng Wang')}.</Entry></Section>
    <Section title="Projects" subtitle={<>NLP, GenAI,<br />Diffusion</>} reverse><Entry title="Thompson Sampling with Diffusion and Flow Matching Priors for Linear Banditsl">Developed guided diffusion and flow matching algorithms for the linear bandit prior, as well as low-rank approximations to reduce per-round time complexity while preserving regret bounds. Open-source code available on {link('https://github.com/joshnegreanu/diffusion-priors', 'Github')}.</Entry><Entry title="Discrete Diffusion and Auto-Regressive Language Model">A from-scratch implementation of both traditional auto-regressive and discrete diffusion generative transformer-based language models. Trained on openwebtext utilizing DGX system. Open-source code available on {link('https://github.com/joshnegreanu/language-diffusion', 'Github')}.</Entry><Entry title="Denoising Diffusion and Flow Matching Image Generation">A from-scratch implementation of denoising diffusion and flow matching image generative models (CNN U-Net and latent vision transformer). Trained on Stanford Cars, CelebA, ImageNet utilizing DGX system. Open-source code available on {link('https://github.com/joshnegreanu/image-diffusion', 'Github')}.</Entry></Section>
    <Section title="Experience" subtitle={<>Industry,<br />Educational</>}><Entry title="REVOBOTS AI Intern">Designed and deployed video conferencing application allowing real-time VR embodiment of robots for teleoperation. Implemented with WebXR, GPU accelerated encoding, SFU server.<br /><br />Utilized Hugging Face LeRobot framework for teleoperation, 100+ episode dataset recording, compression.<br /><br />Employed MLOps for automated multi-day training of transformer-based robot policies on DGX system using collected datasets.</Entry><Entry title="Graduate Teaching Assistant">Teaching assistant for Programming Language Fundamentals, covering Haskell and Prolog.</Entry><Entry title="Undergraduate Learning Assistant">Learning assistant for Operating Systems I, Data Structures, and Gen Engineering.</Entry></Section>
  </main><div className="footer-spacer" /><footer className="botnav"><div className="footer_text">WEBSITE CODE IS ON GITHUB. LINK IS ABOVE. © 2026</div><a className="footer_link" href="mailto:joshua.negreanu@gmail.com">joshua.negreanu@gmail.com</a></footer></>
}
