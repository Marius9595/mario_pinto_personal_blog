import {describe, it, expect} from "vitest";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {PostsContainer} from "./PostsContainer.tsx";

describe('<PostsContainer/>', () => {
  const posts = [
    {
      title: "Post 1",
      tags: ["tag1", "tag2"],
      image: {
        url: "url",
        alt: "alt post1"
      },
      publicationDate: "date",
      url: "url"
    },
    {
      title: "Post 2",
      tags: ["tag3", "tag4"],
      image: {
        url: "url",
        alt: "alt post2"
      },
      publicationDate: "date",
      url: "url"
    }
  ]

  it('should render posts container', () => {
    const postContainer = render(<PostsContainer posts={[]}/>)

    postContainer.getByText("No se encontraron posts");
  })

  it('should render posts when posts are passed', () => {
    const postContainer = render(<PostsContainer posts={posts}/>)

    postContainer.getByText("Post 1");
    postContainer.getByText("tag1");
    postContainer.getByText("tag2");
    postContainer.getAllByAltText("alt post1");
    postContainer.getByText("Post 2");
    postContainer.getByText("tag3");
    postContainer.getByText("tag4");
    postContainer.getAllByAltText("alt post2");
  })

  it('should filter posts by title of post', () => {
    const postContainer = render(<PostsContainer posts={posts}/>)

    const searchBar = postContainer.getByPlaceholderText("Me gustaría leer sobre...");
    fireEvent.change(searchBar, {target: {value: "Post 1"}});

    postContainer.getByText("Post 1");
    postContainer.getByText("tag1");
    postContainer.getByText("tag2");
    postContainer.getAllByAltText("alt post1");

    waitFor(
        () => {
          expect(postContainer.queryByText("Post 2")).toBeNull();
          expect(postContainer.queryByText("tag3")).toBeNull();
          expect(postContainer.queryByText("tag4")).toBeNull();
          expect(postContainer.queryByAltText("alt post2")).toBeNull();
        },
        {timeout: 500}
    )
  })

  it('should filter posts by tag of post', () => {
    const postContainer = render(<PostsContainer posts={posts}/>);

    const searchBar = postContainer.getByPlaceholderText("Me gustaría leer sobre...");
    fireEvent.change(searchBar, {target: {value: "tag3"}});

    postContainer.getByText("Post 2");
    postContainer.getByText("tag3");
    postContainer.getByText("tag4");
    postContainer.getAllByAltText("alt post2");

    waitFor(
        () => {
          expect(postContainer.queryByText("Post 1")).toBeNull();
          expect(postContainer.queryByText("tag1")).toBeNull();
          expect(postContainer.queryByText("tag2")).toBeNull();
          expect(postContainer.queryByAltText("alt post1")).toBeNull();
        },
        {timeout: 500}
    )
  })

  it('should remove filter when user deletes the text typed', () => {
    const postContainer = render(<PostsContainer posts={posts}/>);

    const searchBar = postContainer.getByPlaceholderText("Me gustaría leer sobre...");
    fireEvent.change(searchBar, {target: {value: "Post 1"}});
    postContainer.getByText("Post 1");
    postContainer.getByText("tag1");
    postContainer.getByText("tag2");
    postContainer.getAllByAltText("alt post1");
    waitFor(
        () => {
          expect(postContainer.queryByText("Post 2")).toBeNull();
          expect(postContainer.queryByText("tag3")).toBeNull();
          expect(postContainer.queryByText("tag4")).toBeNull();
          expect(postContainer.queryByAltText("alt post2")).toBeNull();
        },
        {timeout: 500}
    )

    fireEvent.change(searchBar, {target: {value: ""}});

    waitFor(
        () => {
          postContainer.getByText("Post 1");
          postContainer.getByText("tag1");
          postContainer.getByText("tag2");
          postContainer.getAllByAltText("alt post1");
          postContainer.getByText("Post 2");
          postContainer.getByText("tag3");
          postContainer.getByText("tag4");
          postContainer.getAllByAltText("alt post2");
        },
        {timeout: 500}
    )
  })
})