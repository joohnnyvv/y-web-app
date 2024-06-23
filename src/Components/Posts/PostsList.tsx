import { Paper, Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ApiPaths, apiUrl } from "../../Consts/Api";
import { useSnackbar } from "../../Context/SnackbarContext";
import { Post } from "../../Models/PostModel";
import { User } from "../../Models/UserModel";
import ProfileInfoPaper from "../Pages/ProfilePage/ProfileInfoPaper";
import AddPostInput from "./AddPostInput/AddPostInput";
import PostItem from "./PostItem/PostItem";
import { useAtom } from "jotai";
import {
  isLoadingAtom,
  isLoggedInAtom,
  loggedUserAtom,
} from "../../utils/Atoms";

interface PostsListProps {
  child: "profile" | "main";
  user?: User;
}

export default function PostsList(props: PostsListProps) {
  const [posts, setPosts] = useState<Post[] | undefined>();
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const [isLogged, setIsLogged] = useAtom(isLoggedInAtom);
  const didMount = useRef(false);
  const loggedUserId = useRef(-1);
  const { openSnackbar } = useSnackbar();

  const fetchPosts = async () => {
    if (props.child === "main") {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}${ApiPaths.POSTS.POSTS}?loggedUserId=${loggedUserId.current}&filter=new`
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
    if (!loggedUser) {
      loggedUserId.current = -1;
    } else {
      loggedUserId.current = loggedUser.id;
    }
    if (didMount.current) {
      fetchPosts();
    }
    didMount.current = true;
  }, [loggedUser]);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      setIsLogged(true);
      setLoggedUser(parsedUser);
      loggedUserId.current = parsedUser.id;
      fetchPosts();
    } else {
      fetchPosts();
    }
  }, []);

  return (
    <Box width="md" maxWidth="md" sx={{ paddingTop: "20px" }}>
      {props.child === "main" && <AddPostInput fetchPosts={fetchPosts} />}
      {props.child === "profile" && props.user ? (
        <ProfileInfoPaper user={props.user} />
      ) : null}
      {posts ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} fetchPosts={fetchPosts} />
          ))}
        </Box>
      ) : !posts && !isLoading ? (
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          Nothing to show 😩
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
}
