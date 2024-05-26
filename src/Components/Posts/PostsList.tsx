import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { mockedPosts } from "../../Mocks/posts";
import PostItem from "./PostItem/PostItem";

export default function PostsList() {
  return (
    <Container maxWidth="sm" sx={{ paddingTop: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {mockedPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Box>
    </Container>
  );
}
