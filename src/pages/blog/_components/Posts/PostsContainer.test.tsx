import {describe, it, expect} from "vitest";
import {fireEvent, render, type RenderResult, waitFor} from "@testing-library/react";
import {PostsContainer} from "./PostsContainer.tsx";
import type {Post} from "../../types/Post.ts";

describe('<PostsContainer/>', () => {
  const post1: Post =     {
    author: "author",
    title: "Post 1",
    tags: ["tag1", "tag2"],
    image: {
      url: "url",
      alt: "alt post1"
    },
    publicationDate: "date",
    url: "url"
  }
  const post2: Post = {
    author: "author",
    title: "Post 2",
    tags: ["tag3", "tag4"],
    image: {
      url: "url",
      alt: "alt post2"
    },
    publicationDate: "date",
    url: "url"
  }
  const posts = [post1, post2];
  const delayInMsToTriggerSearch = 500;


  it('should render posts container', () => {
    const postContainerEmpty = render(<PostsContainer posts={[]}/>)

    postContainerEmpty.getByText("No se encontraron posts");
  })

  it('should render posts when posts are passed', () => {
    const postContainerWithPosts = render(<PostsContainer posts={posts}/>)

    assertPost1IsIn(postContainerWithPosts);
    assertPost2IsIn(postContainerWithPosts);
  })

  it('should filter posts by title of post', () => {
    const postContainerWithPosts = render(<PostsContainer posts={posts}/>)
    const searchBar = getSearchBarFrom(postContainerWithPosts);
    typeInSearchBar(searchBar, "Post 1");

    waitFor(
        () => {
          assertPost1IsIn(postContainerWithPosts);
          assertPost2IsNotIn(postContainerWithPosts);
        },
        {timeout: delayInMsToTriggerSearch}
    )
  })

  it('should filter posts by tag of post', () => {
    const postContainerWithPosts = render(<PostsContainer posts={posts}/>)
    const searchBar = getSearchBarFrom(postContainerWithPosts);
    typeInSearchBar(searchBar, "tag3");

    waitFor(
        () => {
            assertPost1IsIn(postContainerWithPosts);
            assertPost2IsIn(postContainerWithPosts);
        },
        {timeout: delayInMsToTriggerSearch}
    )
  })

  it('should remove filter when user deletes the text typed', () => {
    const postContainerWithPosts = render(<PostsContainer posts={posts}/>)
    const searchBar = getSearchBarFrom(postContainerWithPosts);
    typeInSearchBar(searchBar, "Post 1");
    waitFor(
        () => {
            assertPost1IsIn(postContainerWithPosts);
            assertPost2IsNotIn(postContainerWithPosts);
        },
        {timeout: delayInMsToTriggerSearch}
    )

    const empty = "";
    typeInSearchBar(searchBar, empty);

    waitFor(
        () => {
            assertPost1IsIn(postContainerWithPosts);
            assertPost2IsIn(postContainerWithPosts);
        },
        {timeout: delayInMsToTriggerSearch}
    )
  })




  function assertPost1IsIn(postContainer: RenderResult) {
    postContainer.getByText(post1.title);
    postContainer.getByText(post1.tags[0]);
    postContainer.getByText(post1.tags[1]);
    postContainer.getAllByAltText(post1.image.alt);
  }

  function assertPost2IsIn(postContainer: RenderResult) {
    postContainer.getByText(post2.title);
    postContainer.getByText(post2.tags[0]);
    postContainer.getByText(post2.tags[1]);
    postContainer.getAllByAltText(post2.image.alt);
  }

  function assertPost2IsNotIn(postContainer: RenderResult) {
    expect(postContainer.queryByText(post2.title)).toBeNull();
    expect(postContainer.queryByText(post2.tags[0])).toBeNull();
    expect(postContainer.queryByText(post2.tags[1])).toBeNull();
    expect(postContainer.queryByAltText(post2.image.alt)).toBeNull();
  }

  function getSearchBarFrom(postContainer: RenderResult) {
    return postContainer.getByPlaceholderText("Me gustaría leer sobre...");
  }

  function typeInSearchBar(searchBar: HTMLElement, text: string) {
    fireEvent.change(searchBar, {target: {value: text}});
  }

})