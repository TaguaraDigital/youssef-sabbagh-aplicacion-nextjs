import Head from "next/head";
import styles from "./Documentation.module.scss";
import Accordion from "../../components/Accordion";

const Documentation = () => {
  return (
    <>
      <Head>
        <title> Test-WeRemote | Documentations</title>
      </Head>
      <section className={styles.section}>
        <h1 className={styles.title}>Documentación</h1>
        <p className={styles.text}>
          Esta pagina esta creada para tratar de explicar el proceso y
          documentacion del processo
        </p>
        <Accordion />
      </section>
    </>
  );
};

export default Documentation;
