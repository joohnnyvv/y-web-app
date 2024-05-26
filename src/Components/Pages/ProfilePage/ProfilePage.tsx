import React from "react";
import NavBar from "../../NavBar/NavBar";
import { Box } from "@mui/material";
import PostsList from "../../Posts/PostsList";

export default function ProfilePage() {
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
        <PostsList child={<div></div>} />
      </Box>
    </>
  );
}
