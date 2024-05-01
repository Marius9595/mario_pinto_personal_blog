import s from './Posts.module.css';
import {Post} from "./Post.tsx";

export type Post = {
  title: string;
  tags: string[];
  image: {
    url: string;
    alt: string;
  }
  publicationDate: string;
  url: string;
}

export function Posts({posts}: {posts: Post[]}) {
  return (
      <section className={s.posts}>

        <section className={
          posts ? s.posts__posts : s.posts__no_matches
        }
        >
          {posts ? posts.map((post: Post, index: number) => (
              <Post
                  title={post.title}
                  tags={post.tags}
                  image={post.image}
                  publicationDate={post.publicationDate}
                  url={post.url ? post.url : post.url}
                  key={index}
              />
          )) : <p className={s.posts__no_matches_text}>
            No se encontraron coincidencias para la búsqueda
          </p>

          }
        </section>
      </section>
  )
}

