import { useContext, useState } from "react";
import styles from "./Search.module.scss";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { Store } from "../../utils/store";
const Search = () => {
  const [searchLocal, setSearchLocal] = useState("");
  const [orderby, setOrderby] = useState("date");
  const { search, setSearch } = useContext(Store);

  const handleClick = (e) => {
    e.preventDefault();

    if (searchLocal === "") {
      alert("debe indicar el criterio de busqueda");
    } else {
      setSearch({ ...search, word: searchLocal, orderby });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.orderby}>
          <label htmlFor="relevance"> Order By : </label>
          <select
            id="relevance"
            className={styles.select}
            onChange={(e) => setOrderby(e.target.value)}
          >
            <option value="date"> Date</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Buscar artículos, noticias, etc...."
            value={searchLocal}
            onChange={(e) => setSearchLocal(e.target.value)}
          />
          <button onClick={handleClick}>
            <FaSearch /> <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
