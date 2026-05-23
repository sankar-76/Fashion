import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      duration = 0.9,
      ease = 'power3.out',
      delay = 0,
      start = 'top 85%',
    } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return ref
}

export function useStaggerReveal(selector, options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const {
      from = { opacity: 0, y: 40 },
      to = { opacity: 1, y: 0 },
      duration = 0.8,
      stagger = 0.15,
      ease = 'power3.out',
      start = 'top 80%',
    } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(selector ? container.querySelectorAll(selector) : container.children, from, {
        ...to,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: container,
          start,
          once: true,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return containerRef
}
