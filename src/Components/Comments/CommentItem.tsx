import { Box, Collapse, Paper, Typography } from "@mui/material";
import { Comment } from "../../Models/CommentModel";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useEffect, useRef, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import "./CommentItem.css";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem(props: CommentItemProps) {
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsTextOverflowing(
        textRef.current.scrollHeight > textRef.current.clientHeight
      );
    }
  }, [textRef, props.comment.content]);

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
            {isLikedByUser ? (
              <FavoriteOutlinedIcon fontSize="small" color="error" />
            ) : (
              <FavoriteBorderOutlinedIcon fontSize="small" />
            )}
            <Typography align="center" variant="caption">
              {props.comment.likesCount}
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
