import styles from './Contact.module.scss'

const EMAIL = 'pablo.bessone@outlook.com'
const GITHUB_URL = 'https://github.com/paablobs'
const LINKEDIN_URL = 'https://www.linkedin.com/in/pablobessone/'

const Contact = () => {
    return (
        <div className={styles.contact}>
            <article className={styles.contact__card}>
                <div className={styles.contact__block}>
                    <h3 className={styles.contact__title}>Contact Information</h3>
                    <div className={styles.contact__infoRow}>
                        <span className={styles.contact__label}>Location</span>
                        <span className={styles.contact__emailButton}>Argentina</span>
                    </div>
                    <div className={styles.contact__infoRow}>
                        <span className={styles.contact__label}>Email</span>
                        <a className={styles.contact__emailButton} href={`mailto:${EMAIL}`}>
                            {EMAIL}
                        </a>
                    </div>
                </div>
                <div className={styles.contact__block}>
                    <h3 className={styles.contact__title}>Connect with Me</h3>
                    <div className={styles.contact__actions}>
                        <a href={GITHUB_URL} target='_blank' rel='noreferrer' className={styles.contact__socialButton}>
                            GitHub
                        </a>
                        <a
                            href={LINKEDIN_URL}
                            target='_blank'
                            rel='noreferrer'
                            className={styles.contact__socialButton}
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default Contact
