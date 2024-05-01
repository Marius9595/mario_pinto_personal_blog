import s from "./Post.module.css"

export interface Props {
  title: string;
  tags: string[];
  image: {
    url: string;
    alt: string;
  }
  publicationDate: string;
  url: string;
}

export function Post(post: Props) {
  return (
      <a
          className={s.post}
          href={post.url}
          target={post.url.includes("http") ? "_blank" : ""}
      >
        <img
            className={s.post__image}
            src={post.image.url}
            alt={post.image.alt}
        />
        <section className={s.post__content}>
          <h4 className={s.post__title}>
            {post.title}
          </h4>
          <div className={s.post__tags}>
            {post.tags.map(function (tag: any) {
              return (
                  <span className={s.post__tag} key={tag}>
                    <p>{tag}</p>
                  </span>
              );
            })}
          </div>
        </section>
      </a>
  )
}
