import styles from './Contact.module.scss'
import { useLanguage, type Language } from '../../hooks/useLanguage'

type ContactProps = {
    language: Language
}

const EMAIL = 'pablo.bessone@outlook.com'
const GITHUB_URL = 'https://github.com/paablobs'
const LINKEDIN_URL = 'https://www.linkedin.com/in/pablobessone/'

const Contact = ({ language }: ContactProps) => {
    const { t } = useLanguage(language)

    return (
        <div className={styles.contact}>
            <p className={styles.contact__title}>{t('contact.tagline')}</p>
            <div className={styles.contact__actions}>
                <a className={styles.contact__link} href={`mailto:${EMAIL}`}>
                    {EMAIL}
                </a>
                <a href={LINKEDIN_URL} target='_blank' rel='noreferrer' className={styles.contact__link}>
                    {t('contact.linkedin')}
                </a>
                <a href={GITHUB_URL} target='_blank' rel='noreferrer' className={styles.contact__link}>
                    {t('contact.github')}
                </a>
            </div>
            <span className={styles.contact__location}>{t('contact.location')}</span>
        </div>
    )
}

export default Contact
