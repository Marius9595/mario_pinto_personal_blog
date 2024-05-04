import {useState} from "react";
import {SearchBar} from "./SearchBar.tsx";
import type {PostMeta} from "../../_types/PostMeta.ts";
import Posts from "./Posts.tsx";


export function PostsContainer({posts}: { posts: PostMeta[] }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "") {
      return;
    }

    const filtered = posts.filter((post: PostMeta) => {
          return post.title.toLowerCase().includes(searchTerm.toLowerCase())
              || post.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
        }
    );

    setFilteredPosts(filtered);
  };

  const handleReset = () => {
    setFilteredPosts(posts);
  };

  return (
      <>
        <SearchBar onSearch={handleSearch} onReset={handleReset}/>
        <Posts posts={filteredPosts}/>
      </>)
}