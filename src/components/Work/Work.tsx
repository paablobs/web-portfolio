import styles from './Work.module.scss'
import workPlaceholderImage from '../../assets/work-placeholder.svg'

type WorkItem = {
	id: number
	title: string
	description: string
	stack: string[]
	image: string
	imageAlt: string
	codeUrl: string
	liveUrl: string
}

const workItems: WorkItem[] = [
	{
		id: 1,
		title: 'E-Mail Spam Detector',
		description:
			'AI-powered Gmail client that detects spam, summarizes emails, and includes an assistant chat for productivity workflows.',
		stack: ['React', 'TypeScript', 'Node', 'Express', 'MongoDB'],
		image: workPlaceholderImage,
		imageAlt: 'Preview of E-Mail Spam Detector project',
		codeUrl: '#',
		liveUrl: '#',
	},
	{
		id: 2,
		title: 'Book Store',
		description:
			'Modern book management platform with authentication, role-based routes, and clean CRUD flows for daily operations.',
		stack: ['React', 'Node', 'MongoDB', 'JWT', 'REST API'],
		image: workPlaceholderImage,
		imageAlt: 'Preview of Book Store project',
		codeUrl: '#',
		liveUrl: '#',
	},
	{
		id: 3,
		title: 'NetScan-Pro',
		description:
			'Bash-based network scanning utility with host discovery, diagnostics, and scriptable checks for infrastructure monitoring.',
		stack: ['Linux', 'Bash', 'Nmap', 'Networking', 'Monitoring'],
		image: workPlaceholderImage,
		imageAlt: 'Preview of NetScan-Pro project',
		codeUrl: '#',
		liveUrl: '#',
	},
]

const Work = () => {
	return (
		<div className={styles.work}>
			<div className={styles.work__list}>
				{workItems.map((item) => (
					<article key={item.id} className={styles.work__card}>
						<div className={styles.work__media}>
							<img className={styles.work__image} src={item.image} alt={item.imageAlt} />
						</div>
						<div className={styles.work__content}>
							<h3 className={styles.work__title}>{item.title}</h3>
							<p className={styles.work__description}>{item.description}</p>
							<ul className={styles.work__stackList}>
								{item.stack.map((tech) => (
									<li key={tech} className={styles.work__stackItem}>
										{tech}
									</li>
								))}
							</ul>
							<div className={styles.work__actions}>
								<a href={item.codeUrl} className={styles.work__link}>
									Code
								</a>
								<a href={item.liveUrl} className={styles.work__link}>
									Live
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
