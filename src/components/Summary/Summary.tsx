import styles from './Summary.module.scss'
import profileImage from '../../assets/sloth.jpg'
import { useLanguage, type Language } from '../../hooks/useLanguage'

const EMAIL = 'pablo.bessone@outlook.com'
const GITHUB_URL = 'https://github.com/paablobs'
const LINKEDIN_URL = 'https://www.linkedin.com/in/pablobessone/'

type SummaryProps = {
    language: Language
}

const Summary = ({ language }: SummaryProps) => {
    const { t, ta } = useLanguage(language)

    return (
        <div className={styles.summary}>
            <div className={styles.summary__content}>
                <div className={styles.summary__main}>
                    <span className={styles.summary__eyebrow}>{t('summary.eyebrow')}</span>
                    <h1 className={styles.summary__title}>{t('summary.title')}</h1>
                    <p className={styles.summary__description}>
                        {t('summary.description')}
                    </p>
                    <div className={styles.summary__actions}>
                        <a href={`mailto:${EMAIL}`} className={styles.summary__link}>
                            {t('summary.email')}
                        </a>
                        <a href={LINKEDIN_URL} target='_blank' rel='noreferrer' className={styles.summary__link}>
                            {t('summary.linkedin')}
                        </a>
                        <a href={GITHUB_URL} target='_blank' rel='noreferrer' className={styles.summary__link}>
                            {t('summary.github')}
                        </a>
                    </div>
                </div>
                <div className={styles.summary__aside}>
                    <img className={styles.summary__avatar} src={profileImage} alt={t('summary.avatarAlt')} />
                    <div className={styles.summary__metaList}>
                        {ta('summary.techStack').map((item, i) => (
                            <span key={i}>{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary
