import { useState } from 'react'
import styles from './Header.module.scss'
import { useLanguage, type Language } from '../../hooks/useLanguage'
import Logo from '../Logo/Logo'

type HeaderProps = {
    isVisible: boolean
    language: Language
    onLanguageToggle: () => void
}

const NAV_BUTTONS = [
    { labelKey: 'header.navAbout', link: '#about' },
    { labelKey: 'header.navExperience', link: '#experience' },
    { labelKey: 'header.navProjects', link: '#work' },
    { labelKey: 'header.navContact', link: '#contact' },
]

const LANG_LABEL: Record<Language, string> = {
    ENGLISH: 'EN',
    SPANISH: 'ES',
}

const Header = ({ isVisible, language, onLanguageToggle }: HeaderProps) => {
    const { t } = useLanguage(language)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const renderNavigation = () =>
        NAV_BUTTONS.map(button => (
            <a
                key={button.labelKey}
                href={button.link}
                className={styles.header__navLink}
                onClick={() => setIsMenuOpen(false)}
            >
                {t(button.labelKey)}
            </a>
        ))

    return (
        <header
            className={`${styles.header} ${!isVisible ? styles['header--hidden'] : ''}`}
        >
            <div className={styles.header__inner}>
                <a href='#top' className={styles.header__brand}>
                    <Logo size={28} />
                    {t('header.brand')}
                </a>
                <div
                    id='primary-navigation'
                    className={`${styles.header__navigation} ${isMenuOpen ? styles['header__navigation--open'] : ''}`}
                >
                    {renderNavigation()}
                </div>
                <div className={styles.header__controls}>
                    <button
                        type='button'
                        className={styles.header__menuToggle}
                        aria-expanded={isMenuOpen}
                        aria-controls='primary-navigation'
                        onClick={() => setIsMenuOpen(open => !open)}
                    >
                        {t('header.menu')}
                    </button>
                    <button
                        type='button'
                        className={styles.header__langToggle}
                        onClick={onLanguageToggle}
                    >
                        {LANG_LABEL[language]}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
