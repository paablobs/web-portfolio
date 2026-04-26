import { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header'
import styles from './MainView.module.scss'

const SCROLL_TOLERANCE = 4

const MainView = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastScrollTopRef = useRef(0)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop
      const lastScrollTop = lastScrollTopRef.current
      const scrollDelta = currentScrollTop - lastScrollTop

      if (currentScrollTop <= 0) {
        setIsHeaderVisible(true)
        lastScrollTopRef.current = 0
        return
      }

      if (Math.abs(scrollDelta) < SCROLL_TOLERANCE) {
        lastScrollTopRef.current = currentScrollTop
        return
      }

      if (scrollDelta < 0) {
        setIsHeaderVisible(true)
      } else {
        setIsHeaderVisible(false)
      }

      lastScrollTopRef.current = currentScrollTop
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className={styles.container}>
			<Header isVisible={isHeaderVisible} />
      <section id="about" className={styles.container__section}>
        <h2>About</h2>
        <p>Sobre mi</p>
      </section>
      <section id="experience" className={styles.container__section}>
        <h2>Experience</h2>
        <p>Mi experiencia profesional</p>
      </section>
      <section id="work" className={styles.container__section}>
        <h2>Work</h2>
        <p>Proyectos y trabajos destacados</p>
      </section>
      <section id="contact" className={styles.container__section}>
        <h2>Contact</h2>
        <p>Canales para contactarme</p>
      </section>
      <button
        type="button"
        className={styles.container__toTopButton}
        onClick={handleScrollToTop}
      >
        ^
      </button>
    </div>
  )
}

export default MainView
