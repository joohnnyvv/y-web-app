import Box from "@mui/material/Box";
import { mockedPosts } from "../../Mocks/posts";
import PostItem from "./PostItem/PostItem";
import AddPostInput from "./AddPostInput/AddPostInput";
import React from "react";

interface PostsListProps {
  child: React.ReactNode;
}

export default function PostsList({ child }: PostsListProps) {
  return (
    <Box maxWidth="sm" sx={{ paddingTop: "20px" }}>
      {child}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {mockedPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Box>
    </Box>
  );
}
