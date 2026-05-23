import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  { 
    id: 1, 
    name: 'Ashen Overcoat', 
    price: '$480', 
    tag: 'Outerwear', 
    bg: 'bg-[#d6cfc4]', 
    accent: '#7a7265',
    image: 'https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallback: 'https://placehold.co/600x800/e8e0d5/8c7c6b?text=Overcoat'
  },
  { 
    id: 2, 
    name: 'Veil Slip Dress', 
    price: '$285', 
    tag: 'Evening', 
    bg: 'bg-[#c4bdb4]', 
    accent: '#b94c2e',
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallback: 'https://placehold.co/600x800/d4c9bc/8c7c6b?text=Silk+Dress'
  },
  { 
    id: 3, 
    name: 'Linen Trousers', 
    price: '$195', 
    tag: 'Essentials', 
    bg: 'bg-[#b8b0a4]', 
    accent: '#0e0c09',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
    fallback: 'https://placehold.co/600x800/cbc2b6/8c7c6b?text=Trousers'
  },
]

const MARQUEE_WORDS = ['Veilhaus', '—', 'Quiet Luxury', '—', 'Intentional Design', '—', 'Wearable Philosophy', '—']

// Image Component with error handling
const ProductImage = ({ src, fallback, alt, bg }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full h-full ${bg}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-rust border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={() => setImgSrc(fallback)}
        onLoad={() => setIsLoading(false)}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
};

export default function Home() {
  const heroRef = useRef(null)
  const h1Ref = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const heroImgRef = useRef(null)
  const lineRef = useRef(null)

  const statsRef = useStaggerReveal('div', { stagger: 0.2 })
  const productsRef = useStaggerReveal(null, { from: { opacity: 0, y: 60 }, stagger: 0.18 })
  const editorialRef = useScrollReveal({ from: { opacity: 0, x: -60 } })

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Hero entrance
    tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power4.inOut', transformOrigin: 'left' })
      .fromTo(h1Ref.current.querySelectorAll('span'), { y: '110%' }, { y: '0%', duration: 1, stagger: 0.08, ease: 'power4.out' }, '-=0.4')
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .fromTo(heroImgRef.current, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=1.2')

    // Parallax on scroll
    gsap.to(heroImgRef.current, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
    })

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <div className="bg-bone min-h-screen">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-20 overflow-hidden pt-24">
        {/* Hero Background Image */}
        <div ref={heroImgRef} className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Hero background"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          
          {/* Decorative shapes */}
          <div className="absolute top-20 right-0 w-1/2 h-full bg-[#c8bfb3]/20" />
          <div className="absolute bottom-0 left-1/3 w-px h-2/3 bg-white/20" />
          <div className="absolute top-1/4 right-1/4 w-48 h-48 border border-white/20 rotate-12" />
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-rust/20 rotate-45" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div ref={lineRef} className="w-16 h-px bg-rust mb-8" style={{ transformOrigin: 'left' }} />

          <h1 ref={h1Ref} className="font-display font-bold leading-none mb-8 overflow-hidden">
            {['The', 'Art', 'of', 'Wearing'].map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="block text-white drop-shadow-lg" style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}>
                  {i % 2 === 1 ? <em className="text-rust">{word}</em> : word}
                </span>
              </span>
            ))}
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
            <p ref={subRef} className="font-body text-white text-lg max-w-xs leading-relaxed drop-shadow-md">
              Deliberate silhouettes. Considered fabrics. Clothing that endures beyond seasons.
            </p>
            <div ref={ctaRef} className="flex gap-4">
              <Link to="/collection" className="bg-white text-black px-8 py-4 font-mono text-xs tracking-widest uppercase hover:bg-rust hover:text-white transition-colors duration-300">
                Explore Collection
              </Link>
              <Link to="/about" className="border border-white text-white px-8 py-4 font-mono text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
                Our Story
              </Link>
            </div>
          </div>

          <div className="mt-12 font-mono text-xs text-white/90 tracking-widest flex items-center gap-4 drop-shadow-md">
            <span>SS 2025</span>
            <span className="w-8 h-px bg-white/50 inline-block" />
            <span>Limited Edition</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-6 border-y border-sand/40 overflow-hidden bg-black">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span key={i} className={`font-display text-lg font-bold tracking-widest mx-4 ${word === '—' ? 'text-rust' : 'text-white'}`}>
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="py-20 px-6 border-b border-sand/30">
        <div ref={statsRef} className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[['1,200+', 'Pieces Crafted'], ['47', 'Artisan Partners'], ['28', 'Countries Reached'], ['100%', 'Natural Fibers']].map(([num, label]) => (
            <div key={label} className="text-center md:text-left">
              <div className="font-display text-5xl font-bold text-black mb-2">{num}</div>
              <div className="font-mono text-xs text-gray-500 tracking-widest uppercase">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-2">— New Arrivals</p>
              <h2 className="font-display text-5xl font-bold">Featured Pieces</h2>
            </div>
            <Link to="/collection" className="hidden md:flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-rust hover:gap-4 transition-all duration-300">
              View All <span>→</span>
            </Link>
          </div>

          <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.id} className={`group relative ${p.bg} aspect-[3/4] overflow-hidden cursor-pointer rounded-lg shadow-lg`}>
                {/* Product Image */}
                <ProductImage
                  src={p.image}
                  fallback={p.fallback}
                  alt={p.name}
                  bg={p.bg}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-400 z-20">
                  <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-1">{p.tag}</p>
                        <h3 className="font-display text-lg font-bold">{p.name}</h3>
                      </div>
                      <span className="font-body text-lg font-medium text-rust">{p.price}</span>
                    </div>
                    <button className="mt-3 w-full py-2 bg-black text-white font-mono text-xs tracking-widest uppercase hover:bg-rust transition-colors duration-300 rounded">
                      Add to Bag
                    </button>
                  </div>
                </div>

                {/* Tag */}
                <div className="absolute top-5 left-5 z-20">
                  <span className="bg-white px-3 py-1 font-mono text-xs tracking-widest uppercase shadow-md rounded">New</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="py-24 px-6 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div ref={editorialRef}>
            <p className="font-mono text-xs text-gray-400 tracking-widest uppercase mb-4">— The Veilhaus Edit</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold italic leading-tight mb-6">
              Slow Fashion.<br />
              <span className="text-rust">Permanent Pieces.</span>
            </h2>
            <p className="font-body text-gray-300 text-base leading-relaxed mb-8 max-w-sm">
              We design for the long view. Each garment is constructed to outlive trends, to patina with time, to become more yours with every wear.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-rust border-b border-rust pb-1 hover:gap-5 transition-all duration-300">
              Read Our Manifesto <span>→</span>
            </Link>
          </div>

          {/* Editorial Image */}
          <div className="relative">
            <div className="aspect-square bg-gray-800 relative overflow-hidden rounded-lg">
              <img 
                src="https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Editorial fashion"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 right-8 font-display text-8xl font-bold text-white/10">VH</div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-8 border-rust rounded-lg" />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-4">— Stay Connected</p>
          <h2 className="font-display text-4xl font-bold mb-4">Join the Inner Circle</h2>
          <p className="font-body text-gray-500 mb-10">Early access to new drops, editorial content, and invitations to private showroom events.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-gray-300 px-5 py-4 font-body text-sm focus:outline-none focus:border-rust transition-colors duration-200 rounded"
            />
            <button className="bg-black text-white px-8 py-4 font-mono text-xs tracking-widest uppercase hover:bg-rust transition-colors duration-300 whitespace-nowrap rounded">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          width: fit-content;
        }
      `}</style>
    </div>
  )
}