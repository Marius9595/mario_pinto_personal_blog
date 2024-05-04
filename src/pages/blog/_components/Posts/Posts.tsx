import s from './Posts.module.css';
import {Post} from "./Post.tsx";
import type {PostMeta} from "../../_types/PostMeta.ts";

export default function Posts({posts}: { posts: PostMeta[] }) {
  return (
      <section className={s.posts}>
        <section className={
          posts ? s.posts__posts : s.posts__no_posts_text
        }
        >
          {posts.length > 0 ? posts.map((post: PostMeta, index: number) => (
              <Post
                  title={post.title}
                  tags={post.tags}
                  image={post.image}
                  publicationDate={post.publicationDate}
                  url={post.url ? post.url : post.url}
                  key={index}
              />
          )) : <p className={s.posts__no_posts_text}>
            No se encontraron posts
          </p>

          }
        </section>
      </section>
  )
}

