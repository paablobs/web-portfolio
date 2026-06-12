import styles from './Work.module.scss'
import workPlaceholderImage from '../../assets/work-placeholder.svg'
import { useLanguage, type Language } from '../../hooks/useLanguage'

type WorkProps = {
    language: Language
}

const WORK_ITEMS = [
	{
		id: 1,
		title: 'Nout',
		descKey: 'work.noutDescription',
		altKey: 'work.noutImageAlt',
		stack: ['React', 'TypeScript', 'Vite', 'TipTap', 'Firebase', 'MUI'],
		image: workPlaceholderImage,
		codeUrl: 'https://github.com/paablobs/Nout',
		liveUrl: 'https://nout.it',
	},
	{
		id: 2,
		title: 'What Day Is Next?',
		descKey: 'work.whatDayIsNextDescription',
		altKey: 'work.whatDayIsNextImageAlt',
		stack: ['React', 'TypeScript', 'Chakra UI', 'Vite'],
		image: workPlaceholderImage,
		codeUrl: 'https://github.com/paablobs/whatdayisnext',
		liveUrl: 'https://paablobs.github.io/whatdayisnext/',
	},
	{
		id: 3,
		title: 'Web Portfolio',
		descKey: 'work.webPortfolioDescription',
		altKey: 'work.webPortfolioImageAlt',
		stack: ['React', 'TypeScript', 'Vite', 'SCSS'],
		image: workPlaceholderImage,
		codeUrl: 'https://github.com/paablobs/web-portfolio',
		liveUrl: 'https://paablobs.github.io/web-portfolio/',
	},
	{
		id: 4,
		title: 'Sabotetris',
		descKey: 'work.sabotetrisDescription',
		altKey: 'work.sabotetrisImageAlt',
		stack: ['TypeScript', 'Canvas', 'Vite'],
		image: workPlaceholderImage,
		codeUrl: 'https://github.com/paablobs/sabotetris',
		liveUrl: 'https://paablobs.github.io/sabotetris/',
	},
]

const Work = ({ language }: WorkProps) => {
	const { t } = useLanguage(language)

	return (
		<div className={styles.work}>
			<div className={styles.work__list}>
				{WORK_ITEMS.map((item) => (
					<article key={item.id} className={styles.work__card}>
						<div className={styles.work__media}>
							<img className={styles.work__image} src={item.image} alt={t(item.altKey)} />
						</div>
						<div className={styles.work__content}>
							<h3 className={styles.work__title}>{item.title}</h3>
							<p className={styles.work__description}>{t(item.descKey)}</p>
							<ul className={styles.work__stackList}>
								{item.stack.map((tech) => (
									<li key={tech} className={styles.work__stackItem}>
										{tech}
									</li>
								))}
							</ul>
							<div className={styles.work__actions}>
								<a href={item.codeUrl} className={styles.work__link}>
									{t('work.code')}
								</a>
								<a href={item.liveUrl} className={styles.work__link}>
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
