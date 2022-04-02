import styles from "./Accordion.module.scss";

const AccordionItem = ({ item, onClick }) => (
  <div key={item.question}>
    <p className={styles.title} onClick={onClick}>
      {item.question}
    </p>
    <p className={styles.text}>{item.answer}</p>
  </div>
);

export default AccordionItem;
