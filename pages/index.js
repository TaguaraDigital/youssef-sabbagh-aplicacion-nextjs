import styles from "../styles/Home.module.scss";

import PostsList from "../components/PostsList";
import Search from "../components/Search";
import { Store } from "../utils/store";
import { useContext, useEffect, useState } from "react";
import Pagination from "../components/Pagination";

// busca los post mas recientes al cargar la primera pagina inicial
export const getStaticProps = async () => {
  const res = await fetch(
    "https://beta.mejorconsalud.com/wp-json/mc/v3/posts?orderby=date&order=desc"
  );
  const resJSON = await res.json();
  return {
    props: { postsInitial: resJSON.data },
    revalidate: 10,
  };
};

const Home = ({ postsInitial }) => {
  const { search, searchResult, setSearchResult } = useContext(Store);
  const [state, setState] = useState({
    posts: [],
    loading: false,
    error: "",
  });

  //busca una nuava pagina con la misma palabra o una nueva busqueda con una nueva palabra
  const fetchData = async () => {
    const URL = `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?search=${search.word}&page=${search.currentPage}&orderby=${search.orderby}&order=${search.order}`;

    console.log(URL);
    setState({ ...state, loading: true });
    try {
      const res = await fetch(URL);
      const data = await res.json();
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  let articulos = state.posts.length > 0 ? state.posts : postsInitial;
  const { loading, error } = state;

  return loading ? (
    <div className="spinner"></div>
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
      <div className={styles.listPost}>
        <PostsList posts={articulos} />
      </div>
    </div>
  );
};

export default Home;
