import { useRef } from 'react'
import Header from '../Header/Header'
import styles from './MainView.module.scss'

const MainView = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className={styles.container}>
			<Header />
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
