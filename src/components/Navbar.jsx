import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const links = [
  { to: '/', label: 'Home' },
  { to: '/collection', label: 'Collection' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [menuOpen])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-bone/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold tracking-widest text-ink">
          VEILHAUS
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`font-body text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                  location.pathname === to ? 'text-rust' : 'text-ink hover:text-rust'
                }`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-px bg-rust transition-all duration-300 ${
                  location.pathname === to ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/collection"
          className="hidden md:inline-flex items-center gap-2 border border-ink text-ink px-5 py-2 text-xs tracking-widest uppercase font-body hover:bg-ink hover:text-bone transition-all duration-300"
        >
          Shop Now
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-ink transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-ink transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-bone/98 backdrop-blur-md border-t border-sand/30 px-6 py-8">
          <ul className="flex flex-col gap-6">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`font-display text-2xl italic ${location.pathname === to ? 'text-rust' : 'text-ink'}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/collection"
            className="mt-8 inline-flex border border-ink text-ink px-6 py-3 text-xs tracking-widest uppercase font-body hover:bg-ink hover:text-bone transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      )}
    </header>
  )
}
