import styles from './Experience.module.scss';

interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  responsibilities: string[];
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: '09/2021 — Present',
    title: 'FullStack Developer',
    company: 'We Are Psh',
    responsibilities: [
      'Complete redesign of different web pages across the project, including its functionality. Additionally migrating part of old code from AngularJS to React/Redux.',
      'Communication with UI/UX team for better understanding and functionality of the project when redesigning on Figma.',
      'Users information management sending data from frontend and/or backend to Mixpanel.',
      'Docker container utilization and bugfixing.',
      'Microservices work with Typescript/Nest connected to MySQL to provide better information on user statuses.',
      'Microfrontends work with Typescript/React.',
      'Development and maintenance of RESTful APIs.',
    ],
    highlights: [
      'Implemented microfrontends and component library within the team.',
      'Promoted best practices and the use of clean code to improve code quality.',
      'Ensured adherence to a coding convention for consistency and maintainability.',
    ],
  },
  {
    period: '01/2020 — 09/2021',
    title: 'FullStack Developer',
    company: 'Futit Services',
    responsibilities: [
      'Jira integration with ERP. Task synchronization, tasks status and reading of worklogs.',
      'Scaleway integration with Openbravo (aka Etendo) to be able to manage the creation of servers from the ERP.',
      'Database management.',
      'Direct and live support to clients.',
      'Frontend developing for the Openbravo WebPOS (E-Commerce).',
    ],
    highlights: [
      'JIRA integration with the ERP made the every day work easier for the management team.',
      'Frontend work for the WebPOS boosted performance and usability for the user.',
    ],
  },
];

const Experience = () => {
  return (
    <div className={styles.experience}>
      <div className={styles.experience__timeline}>
        {experiences.map((exp, index) => (
          <div key={index} className={styles.experience__item}>
            <div className={styles.experience__dot} />
            <div className={styles.experience__card}>
              <div className={styles.experience__header}>
                <span className={styles.experience__period}>{exp.period}</span>
                <h3 className={styles.experience__title}>{exp.title}</h3>
                <span className={styles.experience__company}>{exp.company}</span>
              </div>
              <ul className={styles.experience__list}>
                {exp.responsibilities.map((item, i) => (
                  <li key={i} className={styles.experience__listItem}>{item}</li>
                ))}
              </ul>
              <div className={styles.experience__highlights}>
                <span className={styles.experience__highlightsLabel}>Highlights</span>
                <ul className={styles.experience__highlightsList}>
                  {exp.highlights.map((item, i) => (
                    <li key={i} className={styles.experience__highlightsItem}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
