import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ActiveBadge } from "../../ActiveBadge/ActiveBadge";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddImageDialog from "../AddImageDialog/AddImageDialog";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { AddPostBody } from "../../../Models/RequestBody/RequestBody";
import {
  isLoadingAtom,
  isLoggedInAtom,
  loggedUserAtom,
} from "../../../utils/Atoms";
import { useAtom } from "jotai";
import axios from "axios";
import { ApiPaths, apiUrl } from "../../../Consts/Api";
import { useSnackbar } from "../../../Context/SnackbarContext";

export default function AddPostInput(props: {
  fetchPosts: () => Promise<void>;
}) {
  const [imgUrl, setImgUrl] = useState("");
  const [isAddImgDialogOpen, setIsAddImgDialogOpen] = useState(false);
  const [isImgUrlPresent, setIsImgUrlPresent] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [isLogged] = useAtom(isLoggedInAtom);
  const [loggedUser] = useAtom(loggedUserAtom);
  const { openSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const handleAddImageUrl = (url: string) => {
    setImgUrl(url);
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value.length <= 255) {
      setPostContent(event.target.value);
    }
  };

  const handleSubmit = async () => {
    if (loggedUser) {
      const postData: AddPostBody = {
        content: postContent,
        imageUrl: imgUrl,
        userId: loggedUser?.id,
      };
      setIsLoading(true);
      try {
        await axios.post(`${apiUrl}${ApiPaths.POSTS.POSTS}`, postData);
        props.fetchPosts();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          openSnackbar("Couldn't add post: " + error.message, "error");
        } else if (error instanceof Error) {
          openSnackbar("Couldn't add post: " + error.message, "error");
        } else {
          openSnackbar("Couldn't add post due to an unknown error", "error");
        }
      } finally {
        setIsLoading(false);
      }

      setPostContent("");
      setImgUrl("");
      setIsAddImgDialogOpen(false);
    }
  };

  useEffect(() => {
    imgUrl ? setIsImgUrlPresent(true) : setIsImgUrlPresent(false);
  }, [imgUrl]);

  return (
    <Paper
      elevation={5}
      sx={{
        padding: "20px 20px 10px 20px",
        borderRadius: "0",
        marginBottom: "20px",
        display: "flex",
        gap: "20px",
        width: isLoading ? "860px" : "none",
      }}
    >
      <Box width="md">
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
          id="outlined-multiline-flexible"
          label="Tell us how you're doing"
          sx={{ borderRadius: "24px", width: "inherit" }}
          rows={6}
          multiline
          maxRows={6}
          value={postContent}
          onChange={handleTextFieldChange}
          helperText={`${postContent.length}/255`}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={() =>
              setIsAddImgDialogOpen((prev) => {
                return !prev;
              })
            }
          >
            {isImgUrlPresent ? (
              <>
                <DownloadDoneIcon />
                <Typography variant="caption" sx={{ marginLeft: "3px" }}>
                  Image added
                </Typography>
              </>
            ) : (
              <AddPhotoAlternateIcon />
            )}
          </IconButton>
          <Tooltip
            title={isLogged ? "Add post" : "Sign in or log in to add posts"}
          >
            <div>
              <Button
                variant="contained"
                sx={{
                  maxWidth: "30%",
                  alignSelf: "end",
                  borderRadius: "14px",
                }}
                onClick={handleSubmit}
                disabled={!isLogged || !postContent}
              >
                Post
              </Button>
            </div>
          </Tooltip>
        </Box>
        <Collapse in={isAddImgDialogOpen} collapsedSize={5}>
          <AddImageDialog
            open={isAddImgDialogOpen}
            handleAddImageUrl={handleAddImageUrl}
            onClose={() => setIsAddImgDialogOpen(false)}
            addedImgUrl={imgUrl}
          />
        </Collapse>
      </Box>
    </Paper>
  );
}
