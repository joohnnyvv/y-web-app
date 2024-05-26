import { Box } from "@mui/material";
import TrendingPapers from "../../TrendingPapers/TrendingPapers";
import PostsList from "../../Posts/PostsList";
import NavBar from "../../NavBar/NavBar";
import AddPostInput from "../../Posts/AddPostInput/AddPostInput";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          justifyContent: "space-evenly",
        }}
      >
        <TrendingPapers
          header={"Who to follow:"}
          typeOfContent={"users"}
          collapsedSize={95}
          side="left"
        />
        <PostsList child={<AddPostInput />} />
        <TrendingPapers
          header={"Trending posts:"}
          typeOfContent={"posts"}
          collapsedSize={615}
          side="right"
          disableCollapse
        />
      </Box>
    </>
  );
}
