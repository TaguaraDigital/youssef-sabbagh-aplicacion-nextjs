import styles from "./Accordion.module.scss";

const AccordionItem = ({ faq, active, onToggle }) => {
  const { question, answer } = faq;

  return (
    <li
      className={
        active
          ? `${styles.accordion_item} ${styles.active}`
          : `${styles.accordion_item}`
      }
    >
      <button className={styles.button} onClick={onToggle}>
        {question}
        <span className={styles.control}> {active ? "—" : "+"} </span>
      </button>
      <div
        className={
          active
            ? `${styles.answer_wrapper} ${styles.open}`
            : `${styles.answer_wrapper}`
        }
      >
        <div className={styles.answer}>{answer}</div>
      </div>
    </li>
  );
};

export default AccordionItem;
