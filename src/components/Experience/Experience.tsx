import styles from './Experience.module.scss';
import { useLanguage, type Language } from '../../hooks/useLanguage';

type ExperienceProps = {
  language: Language
}

interface ExperienceItem {
  id: string;
  period: string;
  titleKey: string;
  company: string;
  responsibilitiesKey: string;
  highlightsKey: string;
  stack: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'psh',
    period: '09/2021 — Present',
    titleKey: 'experience.pshTitle',
    company: 'We Are Psh',
    responsibilitiesKey: 'experience.pshResponsibilities',
    highlightsKey: 'experience.pshHighlights',
    stack: ['React', 'Redux', 'TypeScript', 'NestJS', 'MySQL', 'Docker', 'Mixpanel'],
  },
  {
    id: 'futit',
    period: '01/2020 — 09/2021',
    titleKey: 'experience.futitTitle',
    company: 'Futit Services',
    responsibilitiesKey: 'experience.futitResponsibilities',
    highlightsKey: 'experience.futitHighlights',
    stack: ['JavaScript', 'PHP', 'PostgreSQL', 'Openbravo', 'Etendo', 'Jira'],
  },
];

const Experience = ({ language }: ExperienceProps) => {
  const { t, ta } = useLanguage(language)

  return (
    <div className={styles.experience}>
      <div className={styles.experience__timeline}>
        {experiences.map((exp) => {
          const responsibilities = ta(exp.responsibilitiesKey);
          const highlights = ta(exp.highlightsKey);

          return (
            <div key={exp.id} className={styles.experience__item}>
              <div className={styles.experience__dot} />
              <div className={styles.experience__card}>
                <div className={styles.experience__header}>
                  <span className={styles.experience__period}>{exp.period}</span>
                  <div className={styles.experience__headingGroup}>
                    <h3 className={styles.experience__title}>{t(exp.titleKey)}</h3>
                    <span className={styles.experience__company}>{exp.company}</span>
                  </div>
                </div>
                <ul className={styles.experience__list}>
                  {responsibilities.map((item, i) => (
                    <li key={i} className={styles.experience__listItem}>{item}</li>
                  ))}
                </ul>
                <div className={styles.experience__highlights}>
                  <span className={styles.experience__highlightsLabel}>{t('experience.highlightsLabel')}</span>
                  <ul className={styles.experience__highlightsList}>
                    {highlights.map((item, i) => (
                      <li key={i} className={styles.experience__listItem}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.experience__stack}>
                  <ul className={styles.experience__stackList}>
                    {exp.stack.map((tech) => (
                      <li key={tech} className={styles.experience__stackItem}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Experience;
