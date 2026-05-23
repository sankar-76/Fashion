import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const TEAM = [
  { name: 'Elara Voss', role: 'Creative Director', bio: 'Former Maison Margiela. Obsessed with the weight of linen and the patience required to cut well.' },
  { name: 'Jonas Krell', role: 'Head of Craft', bio: "Third-generation tailor. Trained in Vienna. Believes a garment's inside is as important as its exterior." },
  { name: 'Mia Osei', role: 'Sustainability Lead', bio: "Material science background. Sources the world's most conscientious mills and holds us accountable." },
]

const VALUES = [
  { num: '01', title: 'Deliberate Design', text: 'We release fewer than 30 pieces per season. No padding, no filler — only what earns its place.' },
  { num: '02', title: 'Material Integrity', text: 'Natural fibers only. We trace every thread back to its source and publish that lineage openly.' },
  { num: '03', title: 'Atelier Production', text: 'Made in small workshops across Portugal and Japan, never in bulk. Relationships over volume.' },
  { num: '04', title: 'Permanence', text: 'Every piece includes a complimentary lifetime repair programme. We mean "forever" literally.' },
]

export default function About() {
  const heroRef = useRef(null)
  const valuesRef = useStaggerReveal('article', { stagger: 0.2, from: { opacity: 0, x: -40 } })
  const teamRef = useStaggerReveal(null, { stagger: 0.2 })
  const quoteRef = useScrollReveal({ from: { opacity: 0, y: 60 } })

  useEffect(() => {
    gsap.fromTo(
      heroRef.current.querySelectorAll('.anim'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <div className="bg-bone min-h-screen pt-32">
      {/* Hero */}
      <div ref={heroRef} className="max-w-7xl mx-auto px-6 mb-24">
        <p className="anim font-mono text-xs text-muted tracking-widest uppercase mb-4">— Our Story</p>
        <h1 className="anim font-display text-6xl md:text-8xl font-bold leading-none mb-8">
          Built on<br />
          <em className="text-rust">Conviction.</em>
        </h1>
        <p className="anim font-body text-muted text-xl leading-relaxed max-w-2xl">
          Veilhaus was founded in 2018 out of frustration with fashion's acceleration. We believed — still believe — that clothing should be something you accumulate slowly, intentionally, over a life.
        </p>
      </div>

      {/* Full-width band */}
      <div className="bg-ink py-32 px-6 mb-24 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="font-display text-[20vw] font-bold text-bone whitespace-nowrap">VEILHAUS</span>
        </div>
        <div ref={quoteRef} className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="font-display text-3xl md:text-5xl italic text-bone leading-tight mb-6">
            "The most political act in fashion is to buy less, care more, and make each piece last a lifetime."
          </p>
          <span className="font-mono text-xs text-sand tracking-widest">— Elara Voss, Founder</span>
        </div>
      </div>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex items-end gap-4 mb-14">
          <h2 className="font-display text-4xl font-bold">What We Stand For</h2>
          <div className="flex-1 h-px bg-sand/40 mb-2" />
        </div>
        <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-sand/20">
          {VALUES.map(v => (
            <article key={v.num} className="bg-bone p-10 hover:bg-[#ede7dc] transition-colors duration-300 group">
              <span className="font-mono text-4xl font-bold text-sand/40 group-hover:text-rust transition-colors duration-300 mb-4 block">
                {v.num}
              </span>
              <h3 className="font-display text-2xl font-semibold mb-3">{v.title}</h3>
              <p className="font-body text-muted leading-relaxed">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">— The People</p>
        <h2 className="font-display text-4xl font-bold mb-14">Who Makes Veilhaus</h2>
        <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map(m => (
            <div key={m.name} className="group">
              <div className="aspect-square bg-[#d4ccc0] mb-5 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-32 rounded-t-full opacity-20" style={{ background: 'linear-gradient(to bottom, #7a7265, #0e0c09)' }} />
                </div>
                <div className="absolute inset-0 bg-rust/0 group-hover:bg-rust/10 transition-all duration-500" />
              </div>
              <h3 className="font-display text-xl font-bold">{m.name}</h3>
              <p className="font-mono text-xs text-rust tracking-widest uppercase mb-3">{m.role}</p>
              <p className="font-body text-muted text-sm leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Atelier stats */}
      <section className="bg-[#1a1714] text-bone py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['2018', 'Founded'], ['3', 'Ateliers'], ['100%', 'Traceable'], ['∞', 'Repairs']].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-5xl font-bold text-rust mb-2">{n}</div>
              <div className="font-mono text-xs text-sand tracking-widest uppercase">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
