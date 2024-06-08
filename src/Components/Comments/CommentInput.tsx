import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ActiveBadge } from "../ActiveBadge/ActiveBadge";
import { useAtom } from "jotai";
import { isLoggedInAtom, loggedUserAtom } from "../../utils/Atoms";
import axios from "axios";
import { ApiPaths, apiUrl } from "../../Consts/Api";
import { Post } from "../../Models/PostModel";
import { AddCommentBody } from "../../Models/RequestBody/RequestBody";
import { useSnackbar } from "../../Context/SnackbarContext";

export default function CommentInput(props: {
  post: Post;
  fetchComments: () => Promise<void>;
}) {
  const [isLogged] = useAtom(isLoggedInAtom);
  const [loggedUser] = useAtom(loggedUserAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const { openSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    setIsLoading(true);
    if (loggedUser && content) {
      const requestBody: AddCommentBody = {
        userId: loggedUser.id,
        content: content,
      };
      try {
        await axios.post(
          `${apiUrl}${ApiPaths.COMMENTS.COMMENTS}/${props.post.id}`,
          requestBody
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          openSnackbar(error.message, "error");
        } else if (error instanceof Error) {
          openSnackbar(error.message, "error");
        } else {
          openSnackbar("Couldn't add post due to an unknown error", "error");
        }
      } finally {
        setIsLoading(false);
        setContent("");
        props.fetchComments();
      }
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <Box
      sx={{
        padding: "20px 20px 10px 20px",
        borderRadius: "0",
        marginBottom: "20px",
        display: "flex",
        gap: "20px",
        width: "100%",
      }}
    >
      <Box>
        {loggedUser ? (
          <Avatar
            alt={loggedUser.name + " " + loggedUser.lastName}
            sx={{ bgcolor: loggedUser.avatarColor }}
          >
            {loggedUser.name.charAt(0) + loggedUser.lastName.charAt(0)}
          </Avatar>
        ) : (
          <Avatar alt="Remy Sharp" />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "8px",
        }}
      >
        <TextField
          id="comment-input"
          label="Add comment"
          sx={{ borderRadius: "24px", width: "90%" }}
          rows={6}
          multiline
          maxRows={6}
          value={content}
          onChange={handleContentChange}
        />
        <Button
          variant="contained"
          sx={{ alignSelf: "end", marginTop: "10px", marginRight: "60px" }}
          disabled={!isLogged && content.length === 0}
          onClick={handleSubmit}
        >
          {isLoading ? <CircularProgress color="inherit" size={25} /> : "Add"}
        </Button>
      </Box>
    </Box>
  );
}
