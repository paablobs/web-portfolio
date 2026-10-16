import styles from './Work.module.scss'
import { featuredProjects } from '../../data/projects'
import { localizedPath, translate, type Language } from '../../i18n'

type WorkProps = {
    language: Language
}

const Work = ({ language }: WorkProps) => {
    const { t } = translate(language)

    return (
        <div className={styles.work}>
            <div className={styles.work__list}>
                {featuredProjects.map(item => (
                    <article key={item.slug} className={styles.work__card}>
                        <div className={styles.work__media}>
                            <img
                                className={styles.work__image}
                                src={item.image.src}
                                alt={t(item.altKey)}
                                width='530'
                                height='320'
                                loading='lazy'
                                decoding='async'
                            />
                        </div>
                        <div className={styles.work__content}>
                            <h3 className={styles.work__title}><a className={styles.work__titleLink} href={localizedPath(import.meta.env.BASE_URL, language === 'SPANISH' ? 'es' : 'en', `projects/${item.slug}`)}>{item.title}</a></h3>
                            <p className={styles.work__description}>{t(item.descKey)}</p>
                            <ul className={styles.work__stackList}>
                                {item.stack.map(tech => (
                                    <li key={tech} className={styles.work__stackItem}>
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.work__actions}>
                                <a href={localizedPath(import.meta.env.BASE_URL, language === 'SPANISH' ? 'es' : 'en', `projects/${item.slug}`)} className={`${styles.work__link} ${styles['work__link--primary']}`}>
                                    {t('work.caseStudy')}
                                </a>
                                <a href={item.codeUrl} target='_blank' rel='noopener noreferrer' className={styles.work__link}>
                                    {t('work.code')}
                                </a>
                                <a
                                    href={item.liveUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={styles.work__link}
                                >
                                    {t('work.live')}
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Work
