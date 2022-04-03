import { useState } from "react";
import { faqs } from "./faqs";
import styles from "./Accordion.module.scss";

import AccordionItem from "./AccordionItem";

const Accordion = () => {
  const [clicked, setClicked] = useState("0");
  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };
  return (
    <ul className={styles.accordion}>
      {faqs.map((faq, index) => (
        <AccordionItem
          key={faq.id}
          faq={faq}
          onToggle={() => handleToggle(index)}
          active={clicked === index}
        />
      ))}
    </ul>
  );
};

export default Accordion;
