import styles from './About.module.scss'
import { useLanguage, type Language } from '../../hooks/useLanguage'

const skills = [
    'JavaScript',
    'TypeScript',
    'React',
    'Redux',
    'Node',
    'NestJS',
    'MySQL',
    'Docker',
    'Microfrontends',
    'Mixpanel',
]

type AboutProps = {
    language: Language
}

const About = ({ language }: AboutProps) => {
    const { t } = useLanguage(language)

    return (
        <div className={styles.about}>
            <div className={styles.about__content}>
                <p className={styles.about__text}>
                    {t('about.text1')}
                    <br /><br />
                    {t('about.text2')}
                    <br /><br />
                    {t('about.text3')}
                    <br /><br />
                    {t('about.text4')}
                </p>
            </div>
            <div className={styles.about__stack}>
                <span className={styles.about__stackTitle}>{t('about.stackTitle')}</span>
                <ul className={styles.about__stackList}>
                    {skills.map((skill) => (
                        <li key={skill} className={styles.about__stackItem}>
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default About
