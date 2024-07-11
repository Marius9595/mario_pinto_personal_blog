import {render} from "@testing-library/react";

import {describe, it} from "vitest";

import Posts from "./Posts.tsx";


describe("<Posts/>", () => {
  it("should not render posts when post are not passed", () => {
    const result = render(<Posts posts={[]} /> );

    result.getByText("No se encontraron posts");
  });

  it("should render posts when posts are passed", () => {
    const posts = [
      {
        author: "author",
        title: "Post 1",
        tags: ["tag1", "tag2"],
        image: {
          url: "url",
          alt: "alt"
        },
        publicationDate: "date",
        url: "url"
      }
    ];

    const result = render(<Posts posts={posts}/>);

    result.getByAltText("alt");
    result.getByText("Post 1");
    result.getByText("tag1");
    result.getByText("tag2");
  });
})