import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { ApiPaths, apiUrl } from "../../Consts/Api";
import { useSnackbar } from "../../Context/SnackbarContext";
import { Comment } from "../../Models/CommentModel";
import { Post } from "../../Models/PostModel";
import {
  commentFromWsAtom,
  isLoadingAtom,
  isLoggedInAtom,
  loggedUserAtom,
} from "../../utils/Atoms";
import PostItem from "../Posts/PostItem/PostItem";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

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
  overflowX: "hidden",
  p: 4,
  width: isMobile ? "95%" : "auto",
  maxWidth: isMobile ? "95%" : "sm",
});

export default function CommentsModal(props: CommentsModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [comments, setComments] = useState<Comment[]>([]);
  const { openSnackbar } = useSnackbar();
  const [loggedUser] = useAtom(loggedUserAtom);
  const [isLogged] = useAtom(isLoggedInAtom);
  const [commentFromWs, setCommentFromWs] = useAtom(commentFromWsAtom);

  const fetchComments = async () => {
    if (loggedUser) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}${ApiPaths.COMMENTS.COMMENTS}/${
            props.post.id
          }?loggedUserId=${loggedUser ? loggedUser.id : -1}&userId=${
            loggedUser.id
          }`
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
        {comments ? (
          comments.map((comment) => (
            <div key={comment.id}>
              <CommentItem comment={comment} />
              <Divider sx={{ margin: "5px 0 5px 0" }} />
            </div>
          ))
        ) : isLogged ? (
          ""
        ) : (
          <Typography variant="h1">
            You need to login to see comments
          </Typography>
        )}
      </Box>
    </Modal>
  );
}
