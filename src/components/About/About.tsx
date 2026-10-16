import styles from './About.module.scss'
import { translate, type Language } from '../../i18n'

const skillGroups = [
    { titleKey: 'about.frontendTitle', skills: ['JavaScript', 'TypeScript', 'React', 'Redux', 'Microfrontends'] },
    { titleKey: 'about.backendTitle', skills: ['Node.js', 'NestJS', 'REST APIs', 'MySQL', 'PostgreSQL'] },
    { titleKey: 'about.deliveryTitle', skills: ['Docker', 'CI/CD', 'Mixpanel', 'Jira', 'Openbravo / Etendo'] },
    { titleKey: 'about.aiTitle', skills: ['AI / LLM integration', 'Guardrails', 'PII anonymization', 'LLM evaluations'] },
]
const projectSkills = ['Firestore', 'SQLite / WebAssembly', 'Web Workers', 'Web Crypto', 'Vitest', 'React Testing Library', 'Playwright', 'GitHub Actions']

type AboutProps = {
    language: Language
}

const About = ({ language }: AboutProps) => {
    const { t } = translate(language)

    return (
        <div className={styles.about}>
            <div className={styles.about__content}>
                {['text1', 'text2', 'text3', 'text4'].map(key => (
                    <p key={key} className={styles.about__text}>{t(`about.${key}`)}</p>
                ))}
            </div>
            <div className={styles.about__stack}>
                <h3 className={styles.about__stackTitle}>{t('about.stackTitle')}</h3>
                {skillGroups.map(group => (
                    <div key={group.titleKey} className={styles.about__skillGroup}>
                        <h4 className={styles.about__groupTitle}>{t(group.titleKey)}</h4>
                        <ul className={styles.about__stackList}>
                            {group.skills.map(skill => <li key={skill} className={styles.about__stackItem}>{skill}</li>)}
                        </ul>
                    </div>
                ))}
                <h3 className={styles.about__stackTitle}>{t('about.projectStackTitle')}</h3>
                <ul className={styles.about__stackList}>
                    {projectSkills.map(skill => <li key={skill} className={styles.about__stackItem}>{skill}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default About
