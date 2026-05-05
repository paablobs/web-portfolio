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
		title: 'Nout',
		description:
			'Offline-first note-taking app with rich text editing, folder organization, favorites, trash recovery, and optional Firebase sync.',
		stack: ['React', 'TypeScript', 'Vite', 'TipTap', 'Firebase', 'MUI'],
		image: workPlaceholderImage,
		imageAlt: 'Preview of Nout note-taking application',
		codeUrl: 'https://github.com/paablobs/Nout',
		liveUrl: 'https://nout.it',
	},
	{
		id: 2,
		title: 'What Day Is Next?',
		description:
			'Minimal web app that calculates the next day of the week with a playful tone, simple flow, and a polished dark UI.',
		stack: ['React', 'TypeScript', 'Chakra UI', 'Vite'],
		image: workPlaceholderImage,
		imageAlt: 'Preview of What Day Is Next web application',
		codeUrl: 'https://github.com/paablobs/whatdayisnext',
		liveUrl: 'https://paablobs.github.io/whatdayisnext/',
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
