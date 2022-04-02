import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./ArticleDetail.module.scss";
import Moment from "moment";
import { FaArrowLeft, FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://beta.mejorconsalud.com/wp-json/mc/v3/posts?orderby=date&order=desc"
  );
  const resJSON = await res.json();

  const paths = resJSON.data.map((post) => {
    return {
      params: { id: post.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(
    "https://api.beta.mejorconsalud.com/wp-json/mc/v2/posts/" + id
  );
  const data = await res.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: { article: data },
    revalidate: 10,
  };
};

const ProductDetail = ({ article }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="spinner"></div>;
  }

  const imageShow =
    article.featured_media === null
      ? "/img/no_images.png"
      : article.featured_media.medium_large;

  return (
    <>
      <Head>
        <title> {`${article.metas.title} - Test WeRemote`}</title>
        <meta name="description" content={article.metas.description} />
      </Head>

      <section className={styles.section}>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.back}>
          <Link href="/">
            <a>
              <FaArrowLeft /> Back
            </a>
          </Link>
        </div>
        {/* <p>
          La página única de un artículo debe contener algunos elementos
          básicos: título, categoría, fecha de publicación, contenido (texto
          legible), etiquetas, biografías y nombre del autor.
        </p> */}

        <div className={styles.row}>
          <div className={styles.left}>
            {/* <div>Codigo: {article.id}</div>
            <div>Slug: {article.slug}</div>
            <div>Link: {article.link}</div> */}

            <div className={styles.info}>
              <span className={styles.main_color}>
                <FaCalendarAlt />
              </span>
              <span className={styles.bold}>Publicado :</span>
              {Moment(article.published).format("DD-MM-YYYY")}
            </div>

            <div className={styles.info}>
              <span className={styles.main_color}>
                <FaCalendarCheck />
              </span>
              <span className={styles.bold}>Ultima Actualizacion :</span>
              {Moment(article.modified).format("DD-MM-YYYY")}
            </div>
            <div className={styles.info}>
              <span className={styles.bold}> Resumen: </span>
              <span dangerouslySetInnerHTML={{ __html: article.excerpt }} />
            </div>

            <div className={styles.info}>
              <span className={styles.bold}>Categoria : </span>
              {article.categories.map((category) => (
                <span key={category.id} className={styles.main_color}>
                  {category.name}
                </span>
              ))}
            </div>

            <div className={styles.info}>
              <span className={styles.bold}>Etiquetas : </span>
              {article.tags.map((tag) => (
                <span key={tag.id} className={styles.main_color}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <Image
              src={imageShow}
              alt=""
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
        </div>

        <div>
          <span className={styles.content}>
            <strong>Contenido</strong> :{" "}
          </span>
          <span dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Informacion del Autor */}
        <div className={styles.autor}>
          <div className={styles.avatar}>
            {article.author && (
              <Image
                className={styles.avatar}
                src={article.author?.picture}
                alt={article.author?.name}
                layout="fill"
              />
            )}
          </div>
          <div>Autor: {article.author?.name}</div>
          <div className={styles.info}>
            <span className={styles.bold}> Biografia: </span>
            <span
              dangerouslySetInnerHTML={{ __html: article.author?.description }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
