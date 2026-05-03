import styles from './About.module.scss'
import profileImage from '../../assets/pol.jpg'

const About = () => {
	return (
		<div className={styles.about}>
			<div className={styles.about__content}>
				<div className={styles.about__body}>
					<div className={styles.about__media}>
						<img className={styles.about__avatar} src={profileImage} alt='Pablo Bessone' />
					</div>
					<div className={styles.about__panel}>
						<p className={styles.about__text}>
							Hi! I&apos;m a Full Stack Developer who loves turning ideas into reliable, efficient web
							applications. From redesigning complex UI screens to integrating backend services and
							automated workflows, I enjoy every step of the development process.
							<br /><br />
							I work mainly with React (and Redux), TypeScript, Node (NestJS), and MySQL, and I&apos;m
							constantly learning to bring better solutions to the table. I care about good code, good
							communication, and making things easier for the people I collaborate with.
							<br /><br />
							Lately, I&apos;ve been especially focused on improving how I use AI in my daily workflow to
							maximize efficiency and code quality. I also collaborate on AI initiatives within my team,
							exploring practical ways to integrate these tools into real development processes.
							<br /><br />
							When I&apos;m not coding, I&apos;m usually experimenting with new technologies, reading about
							frontend architecture, or finding smarter ways to build software.
						</p>
						<div className={styles.about__stack}>
							<p className={styles.about__stackTitle}>Most Recent Tech Stack...</p>
							<ul className={styles.about__stackList}>
								<li className={styles.about__stackItem}>JavaScript</li>
								<li className={styles.about__stackItem}>TypeScript</li>
								<li className={styles.about__stackItem}>React</li>
								<li className={styles.about__stackItem}>Node</li>
								<li className={styles.about__stackItem}>Nest</li>
							</ul>
						</div>
						<a href='#' download className={styles.about__cvButton}>
							Download CV
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About
