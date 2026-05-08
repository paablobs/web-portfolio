import styles from './Summary.module.scss'
import profileImage from '../../assets/pol.jpg'

const EMAIL = 'pablo.bessone@outlook.com'
const GITHUB_URL = 'https://github.com/paablobs'
const LINKEDIN_URL = 'https://www.linkedin.com/in/pablobessone/'

const Summary = () => {
    return (
        <div className={styles.summary}>
            <div className={styles.summary__content}>
                <div className={styles.summary__main}>
                    <span className={styles.summary__eyebrow}>Full Stack Developer</span>
                    <h1 className={styles.summary__title}>Pablo Bessone</h1>
                    <p className={styles.summary__description}>
                        I build reliable web products with React, TypeScript, Node and NestJS, with a practical focus
                        on clean UI, scalable frontends and useful backend integrations.
                    </p>
                    <div className={styles.summary__actions}>
                        <a href='/Pablo_Bessone_CV.txt' download className={styles.summary__primaryAction}>
                            Download CV
                        </a>
                        <a href={`mailto:${EMAIL}`} className={styles.summary__link}>
                            Email
                        </a>
                        <a href={LINKEDIN_URL} target='_blank' rel='noreferrer' className={styles.summary__link}>
                            LinkedIn
                        </a>
                        <a href={GITHUB_URL} target='_blank' rel='noreferrer' className={styles.summary__link}>
                            GitHub
                        </a>
                    </div>
                </div>
                <div className={styles.summary__aside}>
                    <img className={styles.summary__avatar} src={profileImage} alt='Pablo Bessone' />
                    <div className={styles.summary__metaList}>
                        <span>React / TypeScript</span>
                        <span>Node / NestJS</span>
                        <span>Microfrontends</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary
