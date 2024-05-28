import { Box, useMediaQuery, useTheme } from "@mui/material";
import TrendingPapers from "../../Reusable/TrendingPapers/TrendingPapers";
import PostsList from "../../Posts/PostsList";
import NavBar from "../../NavBar/NavBar";
import AddPostInput from "../../Posts/AddPostInput/AddPostInput";

export default function HomePage() {
  const theme = useTheme();
  const isXLUp = useMediaQuery(theme.breakpoints.up("xl"));

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
        {isXLUp && (
          <TrendingPapers
            header={"Who to follow:"}
            typeOfContent={"users"}
            collapsedSize={95}
            side="left"
          />
        )}
        <PostsList child={<AddPostInput />} />
        {isXLUp && (
          <TrendingPapers
            header={"Trending posts:"}
            typeOfContent={"posts"}
            collapsedSize={615}
            side="right"
            disableCollapse
          />
        )}
      </Box>
    </>
  );
}
