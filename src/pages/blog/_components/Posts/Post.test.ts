import {describe, it, expect} from "vitest";
import {Post} from "./Post.tsx";
import {render} from "@testing-library/react";

describe("<Post/>", () => {

  const post = {
    title: "Post 1",
    tags: ["tag1", "tag2"],
    image: {
      url: "url",
      alt: "alt"
    },
    publicationDate: "date",
    url: "url"
  }

  it("should render post", () => {
    const result = render(Post(post));

    result.getByAltText("alt");
    result.getByText("Post 1");
    result.getByText("tag1");
    result.getByText("tag2");
  })

  it('should put target="_blank" when link to post is external to web"', () => {
    const postWithExternalURL = {
      ...post,
      url: "http://url"
    };

    const result = render(Post(postWithExternalURL));

    expect(result.getByText("Post 1").closest('a')).toHaveAttribute('target', '_blank');
  })

  it('should not put target="_blank" when link to post is in the web', () => {
    const result = render(Post(post));

    expect(result.getByText("Post 1").closest('a')).not.toHaveAttribute('target', '_blank');
  })
})