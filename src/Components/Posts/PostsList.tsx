import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PostItem from "./PostItem/PostItem";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Post } from "../../Models/PostModel";
import { ApiPaths, apiUrl } from "../../Consts/Api";
import { Avatar, Paper, Skeleton, Typography } from "@mui/material";
import AddPostInput from "./AddPostInput/AddPostInput";
import ProfileInfoPaper from "../Pages/ProfilePage/ProfileInfoPaper";
import { User } from "../../Models/UserModel";
import { useSnackbar } from "../../Context/SnackbarContext";

interface PostsListProps {
  child: "profile" | "main";
  user?: User;
}

export default function PostsList(props: PostsListProps) {
  const [posts, setPosts] = useState<Post[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { openSnackbar } = useSnackbar();

  const fetchPosts = async () => {
    if (props.child === "main") {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}${ApiPaths.POSTS.POSTS}?filter=new`
        );
        setPosts(response.data);
      } catch (error) {
        openSnackbar("Couldnt fetch any posts", "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}${ApiPaths.POSTS.POSTS}/${props.user?.id}?filter=new`
        );
        setPosts(response.data);
      } catch (error) {
        openSnackbar("Couldnt fetch any posts", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box width="md" sx={{ paddingTop: "20px" }}>
      {props.child === "main" && <AddPostInput fetchPosts={fetchPosts} />}
      {props.child === "profile" && props.user ? (
        <ProfileInfoPaper user={props.user} />
      ) : null}
      {isLoading ? (
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Skeleton variant="circular" />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton width="60%">
                <Typography>.</Typography>
              </Skeleton>
              <Skeleton width="40%">
                <Typography>.</Typography>
              </Skeleton>
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
              <Skeleton width="80%">
                <Typography>.</Typography>
              </Skeleton>
            </Box>
          </Box>
        </Paper>
      ) : posts ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </Box>
      ) : (
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          Nothing to show 😩
        </Typography>
      )}
    </Box>
  );
}
