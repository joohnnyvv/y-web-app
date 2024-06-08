import { Box, useMediaQuery, useTheme } from "@mui/material";
import PostsList from "../../Posts/PostsList";
import NavBar from "../../NavBar/NavBar";
import AddPostInput from "../../Posts/AddPostInput/AddPostInput";

export default function HomePage() {
  const theme = useTheme();

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <PostsList child="main" />
      </Box>
    </>
  );
}
