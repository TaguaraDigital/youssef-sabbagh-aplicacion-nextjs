import { createContext, useState } from "react";

export const Store = createContext();

export const StoreProvider = ({ children }) => {
  const [search, setSearch] = useState({
    word: "",
    orderby: "date",
    order: "desc",
    currentPage: 1,
  });
  const [searchResult, setSearchResult] = useState({
    size: 0,
    pages: 0,
    perPage: 10,
    status: "",
  });
  const [posts, setPosts] = useState([]);
  /* Arreglo para las categorias de los articulos buscados con la cantidad de elementos para cada uno
  [
    { name: "cat1", cant: 2 },
    { name: "cat2", cant: 5 },
  ];
  */
  const [categories, setCategories] = useState([]);

  const value = {
    search,
    setSearch,
    categories,
    setCategories,
    searchResult,
    setSearchResult,
    posts,
    setPosts,
  };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
