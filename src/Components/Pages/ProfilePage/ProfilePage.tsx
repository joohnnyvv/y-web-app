import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import { Box, Typography } from "@mui/material";
import PostsList from "../../Posts/PostsList";
import { useParams } from "react-router-dom";
import ProfileInfoPaper from "./ProfileInfoPaper";
import { User } from "../../../Models/UserModel";
import axios from "axios";
import { ApiPaths, apiUrl } from "../../../Consts/Api";

export default function ProfilePage() {
  const params = useParams<{ userId: string }>();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserById = () => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}${ApiPaths.USER.USER}/${params.userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchUserById();
  }, []);

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
          <Typography variant="h1"></Typography>
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
        <PostsList child="profile" user={user} />
      </Box>
    </>
  );
}
