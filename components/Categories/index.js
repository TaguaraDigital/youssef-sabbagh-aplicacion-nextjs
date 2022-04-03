import { useContext } from "react";
import { Store } from "../../utils/store";

import styles from "./Categories.module.scss";

const Categories = () => {
  const { categories } = useContext(Store);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categories</h2>
      {Object.entries(categories).map((category) => {
        return (
          <p
            className={styles.text}
            key={category[0]}
            id={category[0]}
            onClick={(e) => console.log(e.target.id)}
          >
            {category[0]}
            <strong> ({category[1]})</strong>
          </p>
        );
      })}
    </div>
  );
};

export default Categories;
