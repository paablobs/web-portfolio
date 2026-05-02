import styles from './Summary.module.scss'

const Summary = () => {
    return (
        <div className={styles.summary}>
            <div className={styles.summary__content}>
                <div className={styles.summary__left}>
                    <div className={styles.summary__title}>
                        <span className={styles.summary__firstName}>Pablo</span>
                        <span className={styles.summary__lastName}>Bessone</span>
                    </div>
                    <a href='#about' className={styles.summary__actionButton}>
                        About me
                    </a>
                </div>
                <div className={styles.summary__right}>
                    <span className={styles.summary__description}>
                        Software Developer specializing in Full Stack Web Development with expertise in React.js,
                        Node.js and modern Web Technologies.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Summary
