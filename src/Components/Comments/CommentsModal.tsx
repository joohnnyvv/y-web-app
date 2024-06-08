import {
  Box,
  Divider,
  IconButton,
  Modal,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Post } from "../../Models/PostModel";
import PostItem from "../Posts/PostItem/PostItem";
import CommentItem from "./CommentItem";
import CloseIcon from "@mui/icons-material/Close";
import CommentInput from "./CommentInput";
import axios from "axios";
import { ApiPaths, apiUrl } from "../../Consts/Api";
import { Comment } from "../../Models/CommentModel";
import { useSnackbar } from "../../Context/SnackbarContext";
import { useAtom } from "jotai";
import {
  commentFromWsAtom,
  isLoggedInAtom,
  loggedUserAtom,
} from "../../utils/Atoms";

interface CommentsModalProps {
  post: Post;
  isOpen: boolean;
  handleClose: () => void;
}

const style = (isMobile: boolean) => ({
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflowY: "scroll",
  p: 4,
  width: isMobile ? "95%" : "auto",
  maxWidth: isMobile ? "95%" : "sm",
});

export default function CommentsModal(props: CommentsModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { openSnackbar } = useSnackbar();
  const [loggedUser] = useAtom(loggedUserAtom);
  const [commentFromWs, setCommentFromWs] = useAtom(commentFromWsAtom);

  const fetchComments = async () => {
    setIsLoading(true);
    if (loggedUser) {
      try {
        const response = await axios.get(
          `${apiUrl}${ApiPaths.COMMENTS.COMMENTS}/${props.post.id}?userId=${loggedUser.id}`
        );
        setComments(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          openSnackbar(error.message, "error");
        } else if (error instanceof Error) {
          openSnackbar(error.message, "error");
        } else {
          openSnackbar("Couldn't fetch comments to an unknown error", "error");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (commentFromWs) {
      if (commentFromWs.postId === props.post.id) {
        setComments((prevComments) => [
          commentFromWs.commentResponse,
          ...prevComments,
        ]);
      }
    }
  }, [commentFromWs]);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="comments-modal"
      aria-describedby="comments-modal"
    >
      <Box sx={style(isMobile)}>
        {isMobile && (
          <IconButton
            sx={{ position: "absolute", left: "90vw", top: "40px" }}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        )}
        <PostItem post={props.post} />
        <Divider sx={{ margin: "5px 0 5px 0" }} />
        <CommentInput fetchComments={fetchComments} post={props.post} />
        <Divider sx={{ margin: "5px 0 5px 0" }} />
        {comments
          ? comments.map((comment) => (
              <div key={comment.id}>
                <CommentItem comment={comment} />
                <Divider sx={{ margin: "5px 0 5px 0" }} />
              </div>
            ))
          : ""}
      </Box>
    </Modal>
  );
}
