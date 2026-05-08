import styles from './Contact.module.scss'

const EMAIL = 'pablo.bessone@outlook.com'
const GITHUB_URL = 'https://github.com/paablobs'
const LINKEDIN_URL = 'https://www.linkedin.com/in/pablobessone/'

const Contact = () => {
    return (
        <div className={styles.contact}>
            <p className={styles.contact__title}>Open to product work, frontend-heavy roles and useful engineering challenges.</p>
            <div className={styles.contact__actions}>
                <a className={styles.contact__link} href={`mailto:${EMAIL}`}>
                    {EMAIL}
                </a>
                <a href={LINKEDIN_URL} target='_blank' rel='noreferrer' className={styles.contact__link}>
                    LinkedIn
                </a>
                <a href={GITHUB_URL} target='_blank' rel='noreferrer' className={styles.contact__link}>
                    GitHub
                </a>
            </div>
            <span className={styles.contact__location}>Argentina</span>
        </div>
    )
}

export default Contact
