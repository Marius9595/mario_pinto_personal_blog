import {describe, it, expect} from "vitest";
import {Post} from "./Post.tsx";
import {render} from "@testing-library/react";
import type {PostMeta} from "../../_types/PostMeta.ts";

describe("<Post/>", () => {

  const post: PostMeta = {
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
    const result = render(<Post post={post}/>);

    result.getByAltText("alt");
    result.getByText("Post 1");
    result.getByText("tag1");
    result.getByText("tag2");
  })

  it('should open a new tab when post is external to web"', () => {
    const postWithExternalURL = {
      ...post,
      url: "http://url"
    };

    const result = render(<Post post={postWithExternalURL}/>);

    expect(result.getByText("Post 1").closest('a')).toHaveAttribute('target', '_blank');
  })

  it('should not not open in the same page when post is in the web', () => {
    const result = render(<Post post={post}/>);

    expect(result.getByText("Post 1").closest('a')).not.toHaveAttribute('target', '_blank');
  })
})