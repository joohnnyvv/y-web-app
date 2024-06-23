import { useEffect, useRef, useState } from "react";
import { Post } from "../../../Models/PostModel";
import {
  Box,
  Collapse,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import "./PostItem.css";
import UserAvatar from "../../UserAvatar/UserAvatar";
import CloseIcon from "@mui/icons-material/Close";
import CommentsModal from "../../Comments/CommentsModal";
import axios from "axios";
import { ApiPaths, apiUrl } from "../../../Consts/Api";
import { useAtom } from "jotai";
import { isLoggedInAtom, loggedUserAtom } from "../../../utils/Atoms";
import { useSnackbar } from "../../../Context/SnackbarContext";

interface PostItemProps {
  post: Post;
  fetchPosts?: () => Promise<void>;
}

const modalImgStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  height: "90%",
  bgcolor: "background.paper",
  display: "flex",
  alignItems: "center",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PostItem(props: PostItemProps) {
  const [isPostTextExpanded, setIsPostTextExpanded] = useState(false);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const [isModalImgOpen, setIsModalImgOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(props.post.likesCount);
  const [loggedUser] = useAtom(loggedUserAtom);
  const [isLogged] = useAtom(isLoggedInAtom);
  const { openSnackbar } = useSnackbar();

  const handleOpen = () => setIsModalImgOpen(true);
  const handleClose = () => {
    setIsModalImgOpen(false);
  };

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLikedByUser(props.post.isLikedByMe);
  }, [props.post]);

  const handleLikeClick = async () => {
    try {
      await axios.post(`${apiUrl}${ApiPaths.POSTS.LIKE}`, {
        userId: loggedUser?.id,
        postId: props.post.id,
      });
      setIsLikedByUser((prev) => {
        return !prev;
      });
    } catch (error) {
      setIsLikedByUser((prev) => {
        return !prev;
      });
      if (axios.isAxiosError(error)) {
        openSnackbar(error.message, "error");
      } else if (error instanceof Error) {
        openSnackbar(error.message, "error");
      } else {
        openSnackbar("Couldn't add post due to an unknown error", "error");
      }
    }
    setLikesCount((prev) => {
      return isLikedByUser ? prev - 1 : prev + 1;
    });
  };

  useEffect(() => {
    if (textRef.current) {
      setIsTextOverflowing(
        textRef.current.scrollHeight > textRef.current.clientHeight
      );
    }
  }, [textRef, props.post.content]);

  const getFormattedDate = (date: string | Date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);

    if (diffInMinutes < 60) {
      return diffInMinutes <= 1
        ? `${diffInMinutes} minute ago`
        : `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (
      now.getDate() === postDate.getDate() &&
      now.getMonth() === postDate.getMonth() &&
      now.getFullYear() === postDate.getFullYear()
    ) {
      return diffInHours <= 1
        ? `${diffInHours} hour ago`
        : `${diffInHours} hours ago`;
    }

    const year = postDate.getFullYear();
    const month = String(postDate.getMonth() + 1).padStart(2, "0");
    const day = String(postDate.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  return (
    <Paper elevation={3} sx={{ padding: "20px", borderRadius: "0" }}>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <UserAvatar
            userId={props.post.author.id}
            name={props.post.author.name}
            lastName={props.post.author.lastName}
            avatarColor={props.post.author.avatarColor}
            marginBottom="20px"
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <IconButton onClick={handleLikeClick} disabled={!isLogged}>
              <Box className="like-icon">
                {isLikedByUser ? (
                  <FavoriteOutlinedIcon fontSize="small" color="error" />
                ) : !isLogged ? (
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                ) : (
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                )}
                <Typography align="center" variant="caption">
                  {likesCount}
                </Typography>
              </Box>
            </IconButton>
            <Box
              className="like-icon"
              onClick={() => setIsCommentsModalOpen(true)}
            >
              <CommentIcon fontSize="small" />
              <Typography align="center" variant="caption">
                {props.post.commentsCount}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
          >
            {props.post.author.name + " " + props.post.author.lastName}
          </Typography>
          <Typography variant="caption" sx={{ color: "grey" }}>
            {getFormattedDate(props.post.date)}
          </Typography>
          <Collapse ref={textRef} collapsedSize={70} in={isPostTextExpanded}>
            <Typography paragraph>{props.post.content}</Typography>
          </Collapse>
          {isTextOverflowing && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "end",
              }}
            >
              <Typography
                variant="caption"
                onClick={() => {
                  setIsPostTextExpanded((prev) => {
                    return !prev;
                  });
                }}
                sx={{ cursor: "pointer", color: "grey" }}
              >
                {!isPostTextExpanded ? "Show more" : "Show less"}
              </Typography>
            </Box>
          )}
          {props.post.imageUrl ? (
            <Box sx={{ width: "100%" }} maxWidth={"560px"}>
              <img
                src={props.post.imageUrl}
                style={{
                  maxWidth: "100%",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                alt={props.post.content}
                onClick={handleOpen}
              />
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <CommentsModal
        post={props.post}
        isOpen={isCommentsModalOpen}
        handleClose={() => {
          props.fetchPosts && props.fetchPosts();
          setIsCommentsModalOpen(false);
        }}
      />
      <Modal
        open={isModalImgOpen}
        onClose={handleClose}
        aria-labelledby="img-modal"
        aria-describedby="img-modal"
      >
        <Box sx={modalImgStyle}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: "15px", left: "15px" }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={props.post.imageUrl}
            style={{
              maxHeight: "80vh",
              maxWidth: "80vw",
            }}
            alt={props.post.content}
          />
        </Box>
      </Modal>
    </Paper>
  );
}
