import React from "react";
import NavBar from "../../NavBar/NavBar";
import { Box, Typography } from "@mui/material";
import PostsList from "../../Posts/PostsList";
import { useParams } from "react-router-dom";
import ProfileInfoPaper from "./ProfileInfoPaper";
import { mockedUsers } from "../../../Mocks/mockedUsers";
import { User } from "../../../Models/UserModel";

export default function ProfilePage() {
  const params = useParams<{ userId: string }>();

  const user = mockedUsers.find((user: User) => {
    if (params.userId) {
      return user.id === parseInt(params.userId);
    }
  });

  if (!user) {
    return (
      <>
        <NavBar />
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h1">User not found</Typography>
        </Box>
      </>
    );
  }

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
        <PostsList child={<ProfileInfoPaper user={user} />} />
      </Box>
    </>
  );
}
