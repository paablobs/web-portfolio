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

    const renderNavigation = () =>
        NAV_BUTTONS.map(button => (
            <a
                key={button.labelKey}
                href={button.link}
                className={styles.header__navLink}
            >
                {t(button.labelKey)}
            </a>
        ))

    return (
        <div
            className={`${styles.header} ${!isVisible ? styles['header--hidden'] : ''}`}
        >
            <div className={styles.header__inner}>
                <a href='#top' className={styles.header__brand}>
                    <Logo size={28} />
                    {t('header.brand')}
                </a>
                <div className={styles.header__navigation}>
                    {renderNavigation()}
                    <button
                        type='button'
                        className={styles.header__langToggle}
                        onClick={onLanguageToggle}
                    >
                        {LANG_LABEL[language]}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
