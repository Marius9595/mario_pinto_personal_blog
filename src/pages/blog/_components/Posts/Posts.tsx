import s from './Posts.module.css';
import {SearchBar} from "./SearchBar.tsx";
import {Post} from "./Post.tsx";

export function Posts  ({onSearchPost, onReset, filteredPosts}:any) {
  return (
      <section className={s.posts}>
        <SearchBar onSearch={onSearchPost} onReset={onReset}/>
        <section className={
          filteredPosts?s.posts__posts:s.posts__no_matches
        }
        >
          {filteredPosts?filteredPosts.map((post: any, index: number) => (
              <Post
                  title={post.frontmatter.title}
                  tags={post.frontmatter.tags}
                  image={post.frontmatter.image}
                  publicationDate={post.frontmatter.publicationDate}
                  url={post.frontmatter.url?post.frontmatter.url:post.url}
                  key={index}
              />
          )): <p className={s.posts__no_matches_text} >
            No se encontraron coincidencias para la búsqueda
          </p>

          }
        </section>
      </section>
  )
}
