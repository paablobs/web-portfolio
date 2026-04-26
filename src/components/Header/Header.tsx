import styles from './Header.module.scss'

const NAV_BUTTONS = [
    { label: 'About', link: '#about' },
    { label: 'Experience', link: '#experience' },
    { label: 'Work', link: '#work' },
    { label: 'Contact', link: '#contact' },
]

const Header = () => {
    const renderNavigation = () =>
        NAV_BUTTONS.map(button => (
            <a
                key={button.label}
                href={button.link}
                className={styles.header__navLink}
            >
                {button.label}
            </a>
        ))

    return (
        <div className={styles.header}>
            <div>My Logo</div>
            <div className={styles.header__navigation}>
                {renderNavigation()}
                <a href="#" download className={styles.header__cvButton}>
                    Download CV
                </a>
            </div>
        </div>
    )
}

export default Header
