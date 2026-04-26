import styles from './Summary.module.scss'
import profileImage from '../../assets/pol.jpg'

const Summary = () => {
    return (
        <div className={styles.summary}>
            <div className={styles.summary__content}>
                <img className={styles.summary__avatar} src={profileImage} />
                <div className={styles.summary__info}>
                    <span className={styles.summary__title}>Pablo Bessone</span>
                    <span className={styles.summary__description}>
                        Software Developer specializing in Full Stack Web Development with expertise in React.js,
                        Node.js and modern Web Technologies.
                    </span>
                    <a href='#' download className={styles.summary__cvButton}>
                        Download CV
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Summary
