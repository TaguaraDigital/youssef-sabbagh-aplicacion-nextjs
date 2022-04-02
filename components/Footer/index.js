import Image from "next/image";
import styles from "./Footer.module.scss";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://tg-portfolio-react.herokuapp.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Desarrollado por{" "}
        <span className={styles.logo}>
          <Image
            src="/img/tg-logo.png"
            alt="Taguara Digital Logo"
            width={50}
            height={50}
          />
        </span>
      </a>
    </footer>
  );
};

export default Footer;
