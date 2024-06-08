import { Box, Collapse, IconButton, Paper, Typography } from "@mui/material";
import { Comment } from "../../Models/CommentModel";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useEffect, useRef, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import "./CommentItem.css";
import { useAtom } from "jotai";
import { isLoggedInAtom, loggedUserAtom } from "../../utils/Atoms";
import axios from "axios";
import { ApiPaths, apiUrl } from "../../Consts/Api";
import { useSnackbar } from "../../Context/SnackbarContext";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem(props: CommentItemProps) {
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const [isLikedByUser, setIsLikedByUser] = useState(props.comment.isLikedByMe);
  const [likesCount, setLikesCount] = useState(props.comment.likesCount);
  const [isLogged] = useAtom(isLoggedInAtom);
  const [loggedUser] = useAtom(loggedUserAtom);
  const { openSnackbar } = useSnackbar();

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsTextOverflowing(
        textRef.current.scrollHeight > textRef.current.clientHeight
      );
    }
  }, [textRef, props.comment.content]);

  const handleLikeClick = async () => {
    try {
      await axios.post(`${apiUrl}${ApiPaths.COMMENTS.LIKE}`, {
        userId: loggedUser?.id,
        postId: props.comment.id,
      });
      setIsLikedByUser((prev) => {
        return !prev;
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        openSnackbar(error.message, "error");
      } else if (error instanceof Error) {
        openSnackbar(error.message, "error");
      } else {
        openSnackbar("Couldn't like comment due to an unknown error", "error");
      }
    } finally {
      setLikesCount((prev) => {
        return isLikedByUser ? prev - 1 : prev + 1;
      });
    }
  };

  return (
    <Paper elevation={0} sx={{ padding: "15px" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <UserAvatar
            userId={props.comment.author.id}
            name={props.comment.author.name}
            lastName={props.comment.author.lastName}
            avatarColor={props.comment.author.avatarColor}
          />
          <Box
            className="like-icon"
            onClick={() => setIsLikedByUser(!isLikedByUser)}
          >
            <IconButton onClick={handleLikeClick} disabled={!isLogged}>
              {isLikedByUser ? (
                <FavoriteOutlinedIcon fontSize="small" color="error" />
              ) : (
                <FavoriteBorderOutlinedIcon fontSize="small" />
              )}
            </IconButton>
            <Typography align="center" variant="caption">
              {likesCount}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography>
            {props.comment.author.name} {props.comment.author.lastName}
          </Typography>
          <Collapse ref={textRef} collapsedSize={70} in={isCommentExpanded}>
            <Typography paragraph sx={{ fontWeight: 300 }}>
              {props.comment.content}
            </Typography>
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
                  setIsCommentExpanded((prev) => {
                    return !prev;
                  });
                }}
                sx={{ cursor: "pointer", color: "grey" }}
              >
                {!isCommentExpanded ? "Show more" : "Show less"}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
