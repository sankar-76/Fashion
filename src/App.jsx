import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const location = useLocation()
  const pageRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    )
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main ref={pageRef}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
