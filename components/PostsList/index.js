import React from "react";
import PostCard from "../PostCard";
import styles from "./PostsList.module.scss";

const PostsList = ({ posts }) => {
  return (
    <section className={styles.grid}>
      {posts?.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </section>
  );
};

export default PostsList;
