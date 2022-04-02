import { useState } from "react";
import AccordionItem from "./AccordionItem";
import { questionsAnswers } from "./questionAnswerdata";

import styles from "./Accordion.module.scss";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className={styles.faq}>
      {questionsAnswers.map((question, index) => {
        const showDescription = index === activeIndex ? "show-description" : "";
        const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
        const ariaExpanded = index === activeIndex ? "true" : "false";

        return (
          <AccordionItem
            key={question.id}
            item={question}
            onClick={() => {
              setActiveIndex(index);
            }}
          />
        );
      })}
    </div>
  );
};

export default Accordion;
