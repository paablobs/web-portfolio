import { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header'
import Summary from '../Summary/Summary'
import styles from './MainView.module.scss'
import About from '../About/About'
import Experience from '../Experience/Experience'
import Work from '../Work/Work'
import Contact from '../Contact/Contact'

const SCROLL_TOLERANCE = 6

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
            <section className={styles.container__section}>
                <Summary />
            </section>
            <section id='about' className={styles.container__section}>
                <div className={styles.container__sectionTitle}>
                    <span>About me</span>
                    <div className={styles.container__sectionTitleLine} />
                </div>
                <About />
            </section>
            <section id='experience' className={styles.container__section}>
                <div className={styles.container__sectionTitle}>
                    <span>Experience</span>
                    <div className={styles.container__sectionTitleLine} />
                </div>
                <Experience />
            </section>
            <section id='work' className={styles.container__section}>
                <div className={styles.container__sectionTitle}>
                    <span>Work</span>
                    <div className={styles.container__sectionTitleLine} />
                </div>
                <Work />
            </section>
            <section id='contact' className={styles.container__section}>
                <div className={styles.container__sectionTitle}>
                    <span>Get in touch</span>
                    <div className={styles.container__sectionTitleLine} />
                </div>
                <Contact />
            </section>
            <button type='button' className={styles.container__toTopButton} onClick={handleScrollToTop}>
                ^
            </button>
        </div>
    )
}

export default MainView
