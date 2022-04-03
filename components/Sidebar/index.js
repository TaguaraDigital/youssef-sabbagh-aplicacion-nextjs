import styles from "./Sidebar.module.scss";
import Categories from "../Categories";
const Search = () => {
  return (
    <div className={styles.container}>
      <Categories />
    </div>
  );
};

export default Search;
