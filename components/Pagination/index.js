import { useContext, useState } from "react";
import styles from "./Pagination.module.scss";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { Store } from "../../utils/store";

const Pagination = () => {
  const { search, searchResult, setSearch } = useContext(Store);
  const [page, setPage] = useState(search.currentPage);

  const handlePagination = (nextPage) => {
    setPage(nextPage);
    setSearch({ ...search, currentPage: nextPage });
  };

  return (
    <div className={styles.pagination}>
      <div>
        <div className="row">
          <button
            onClick={() => handlePagination(page - 1)}
            disabled={page === 1}
          >
            <FaChevronLeft />
          </button>
          <span>
            <strong>Pagina </strong>
            {page} de {searchResult.pages}
          </span>
          <button onClick={() => handlePagination(page + 1)}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div>
        Resultado de la busqueda por <strong>{search.word}</strong> : hay{" "}
        {searchResult.size} {searchResult.size > 1 ? "articulos" : "articulo"}
      </div>
    </div>
  );
};

export default Pagination;
