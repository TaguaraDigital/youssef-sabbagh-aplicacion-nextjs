import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <Image
              src="/img/tg-logo.png"
              alt="Logo Taguara Digital"
              width={80}
              height={80}
            />
          </a>
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/documentation">
          <a>Documentation</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
