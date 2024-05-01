import {Posts} from "./Posts.tsx";
import {useState} from "react";

export function PostsContainer({posts}: {posts: any[]}) {


  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = (searchTerm: string) => {
    if(searchTerm === "") {
        return;
    }

    const filtered = posts.filter((post: any) =>
        post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase())
        || post.frontmatter.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPosts(filtered);
  };

  const handleReset = () => {
    setFilteredPosts(posts);
  };

  return (
      <Posts
          onSearchPost={handleSearch}
          onReset={handleReset}
          filteredPosts={filteredPosts}
      />
  )
}