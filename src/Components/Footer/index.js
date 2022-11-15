import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <div className={styles.appName}>
          <p>Alvarez - Rescia</p>
          <a href="https://github.com/resciagonzaloUAI/parcial2MCGA" target="_blank" rel="noopener noreferrer">
              Link a repositorio Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;