import Header from '../Header/Header'
import styles from './MainView.module.scss'

const MainView = () => (
    <div className={styles.container}>
		<Header /> 
    <section id="about" className={styles.container__section}>
      <h2>About</h2>
      <p>Sobre mi</p>
    </section>
    <section id="experience" className={styles.container__section}>
      <h2>Experience</h2>
      <p>Mi experiencia profesional</p>
    </section>
    <section id="work" className={styles.container__section}>
      <h2>Work</h2>
      <p>Proyectos y trabajos destacados</p>
    </section>
    <section id="contact" className={styles.container__section}>
      <h2>Contact</h2>
      <p>Canales para contactarme</p>
    </section>
    </div>
)

export default MainView
