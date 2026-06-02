import { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header'
import Summary from '../Summary/Summary'
import styles from './MainView.module.scss'
import About from '../About/About'
import Experience from '../Experience/Experience'
import Work from '../Work/Work'
import Contact from '../Contact/Contact'
import { useLanguage } from '../../hooks/useLanguage'

const SCROLL_TOLERANCE = 6

const MainView = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const lastScrollTopRef = useRef(0)
    const [isHeaderVisible, setIsHeaderVisible] = useState(true)
    const [language, setLanguage] = useState<'ENGLISH' | 'SPANISH'>('ENGLISH')
    const { t } = useLanguage(language)

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

    const handleLanguageToggle = () => {
        setLanguage(prev => (prev === 'ENGLISH' ? 'SPANISH' : 'ENGLISH'))
    }

    const handleScrollToTop = () => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div id='top' ref={containerRef} className={styles.container}>
            test
            <Header isVisible={isHeaderVisible} language={language} onLanguageToggle={handleLanguageToggle} />
            <section className={styles.container__section}>
                <div className={styles.container__sectionInner}>
                    <Summary language={language} />
                </div>
            </section>
            <section id='about' className={styles.container__section}>
                <div className={styles.container__sectionInner}>
                    <div className={styles.container__sectionTitle}>
                        <span>{t('mainView.sectionAbout')}</span>
                        <div className={styles.container__sectionTitleLine} />
                    </div>
                    <About language={language} />
                </div>
            </section>
            <section id='experience' className={styles.container__section}>
                <div className={styles.container__sectionInner}>
                    <div className={styles.container__sectionTitle}>
                        <span>{t('mainView.sectionExperience')}</span>
                        <div className={styles.container__sectionTitleLine} />
                    </div>
                    <Experience language={language} />
                </div>
            </section>
            <section id='work' className={styles.container__section}>
                <div className={styles.container__sectionInner}>
                    <div className={styles.container__sectionTitle}>
                        <span>{t('mainView.sectionProjects')}</span>
                        <div className={styles.container__sectionTitleLine} />
                    </div>
                    <Work language={language} />
                </div>
            </section>
            <section id='contact' className={styles.container__section}>
                <div className={styles.container__sectionInner}>
                    <div className={styles.container__sectionTitle}>
                        <span>{t('mainView.sectionContact')}</span>
                        <div className={styles.container__sectionTitleLine} />
                    </div>
                    <Contact language={language} />
                </div>
            </section>
            <button type='button' className={styles.container__toTopButton} onClick={handleScrollToTop}>
                {t('mainView.scrollToTop')}
            </button>
        </div>
    )
}

export default MainView
