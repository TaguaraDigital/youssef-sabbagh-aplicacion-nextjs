import styles from "../styles/Home.module.scss";

import PostsList from "../components/PostsList";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import { Store } from "../utils/store";
import { useContext, useEffect, useState } from "react";
import Pagination from "../components/Pagination";

// busca los post mas recientes al cargar la primera pagina inicial
export const getStaticProps = async () => {
  const res = await fetch(
    `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?search=salud&page=1&orderby=relevance`
  );
  const resJSON = await res.json();

  //genera las categorias de los post encontrados
  const categoriesPost = {};
  const categories2 = resJSON.data.map((post) => {
    post.categories.map(
      (category) =>
        (categoriesPost[category.name] =
          (categoriesPost[category.name] || 0) + 1)
    );
  });

  return {
    props: {
      postsInitial: resJSON.data,
      categoriesPost,
    },
    revalidate: 10,
  };
};

const Home = ({ postsInitial, categoriesPost }) => {
  const { search, searchResult, setSearchResult, setCategories } =
    useContext(Store);

  const [state, setState] = useState({
    posts: [],
    loading: false,
    error: "",
  });

  //busca una nuava pagina con la misma palabra o una nueva busqueda con una nueva palabra
  const fetchData = async () => {
    const URL = `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?search=${search.word}&page=${search.currentPage}&orderby=${search.orderby}&order=${search.order}`;

    setState({ ...state, loading: true });
    try {
      const res = await fetch(URL);
      const data = await res.json();

      //genera las categorias de los post encontrados
      const categoriesPost = {};
      const categories2 = data.data.map((post) => {
        post.categories.map(
          (category) =>
            (categoriesPost[category.name] =
              (categoriesPost[category.name] || 0) + 1)
        );
      });

      setCategories(categoriesPost);

      setState({ ...state, posts: data.data, loading: false });
      setSearchResult({
        ...searchResult,
        size: data.size,
        pages: data.pages,
        status: "ok",
      });
    } catch (err) {
      console.log("hay un error", err);
      setState({ ...state, error: err.message, loading: false });
    }
  };

  useEffect(() => {
    if (search.word !== "") {
      fetchData();
    } else {
      setCategories(categoriesPost);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  let articulos = state.posts.length > 0 ? state.posts : postsInitial;
  const { loading, error } = state;

  return loading ? (
    <div className="spinnerContainer">
      <div className="spinner"></div>
    </div>
  ) : error ? (
    <div> {error} </div>
  ) : (
    <div className={styles.main}>
      <h1 className={styles.title}>Welcome</h1>
      <Search />
      {searchResult.status === "ok" && searchResult.size === 0 && (
        <div>¡No hay artículos relacionados con el término de búsqueda! </div>
      )}
      {searchResult.status === "ok" && searchResult.size > 0 && <Pagination />}
      <div className={styles.grid}>
        <div className={styles.left}>
          <PostsList posts={articulos} />
        </div>
        <div className={styles.right}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
