import styles from './Summary.module.scss'
import profileImage from '../../assets/sloth.jpg'
import { localizedPath, translate, type Language } from '../../i18n'
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../constants'

type SummaryProps = {
    language: Language
}

const Summary = ({ language }: SummaryProps) => {
    const { t, ta } = translate(language)
    const locale = language === 'SPANISH' ? 'es' : 'en'

    return (
        <div className={styles.summary}>
            <div className={styles.summary__content}>
                <div className={styles.summary__main}>
                    <span className={styles.summary__eyebrow}>{t('summary.eyebrow')}</span>
                    <h1 className={styles.summary__title}>{t('summary.title')}</h1>
                    <p className={styles.summary__description}>{t('summary.description')}</p>
                    <p className={styles.summary__availability}>{t('summary.availability')}</p>
                    <div className={styles.summary__actions}>
                        <a href={`${localizedPath(import.meta.env.BASE_URL, locale)}#work`} className={styles.summary__link}>
                            {t('summary.projects')}
                        </a>
                        <a href={`${import.meta.env.BASE_URL}Pablo_Bessone_CV.pdf`} download='Pablo_Bessone_CV.pdf' type='application/pdf' className={styles.summary__link}>
                            {t('summary.cv')}
                        </a>
                        <a href={`mailto:${EMAIL}`} className={styles.summary__link}>
                            {t('summary.email')}
                        </a>
                        <a href={LINKEDIN_URL} target='_blank' rel='noopener noreferrer' className={styles.summary__link}>
                            {t('summary.linkedin')}
                        </a>
                        <a href={GITHUB_URL} target='_blank' rel='noopener noreferrer' className={styles.summary__link}>
                            {t('summary.github')}
                        </a>
                    </div>
                </div>
                <div className={styles.summary__aside}>
                    <img className={styles.summary__avatar} src={profileImage.src} width={profileImage.width} height={profileImage.height} alt={t('summary.avatarAlt')} />
                    <div className={styles.summary__metaList}>
                        {ta('summary.techStack').map(item => <span key={item}>{item}</span>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary
