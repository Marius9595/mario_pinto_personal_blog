import {type Post, Posts} from "./Posts.tsx";
import {useState} from "react";
import {SearchBar} from "./SearchBar.tsx";


export function PostsContainer({posts}: { posts: Post[] }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "") {
      return;
    }

    const filtered = posts.filter((post: Post) => {
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