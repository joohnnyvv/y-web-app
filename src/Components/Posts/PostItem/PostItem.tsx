import { useEffect, useRef, useState } from "react";
import { Post } from "../../../Models/PostModel";
import { Box, Collapse, Paper, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import "./PostItem.css";
import UserAvatar from "../../UserAvatar/UserAvatar";

interface PostItemProps {
  post: Post;
}

export default function PostItem(props: PostItemProps) {
  const [isPostTextExpanded, setIsPostTextExpanded] = useState(false);
  const [isLikedByUser, setIsLikedByUser] = useState(props.post.isLikedByMe);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

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
            userId={props.post.user.id}
            isActive={props.post.user.isActive}
            name={props.post.user.name}
            lastName={props.post.user.lastName}
            avatarColor={props.post.user.avatarColor}
            marginBottom="20px"
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                {props.post.likesCount}
              </Typography>
            </Box>
            <Box className="like-icon">
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
            {props.post.user.name + " " + props.post.user.lastName}
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
                  setIsPostTextExpanded(!isPostTextExpanded);
                }}
                sx={{ cursor: "pointer", color: "grey" }}
              >
                {!isPostTextExpanded ? "Show more" : "Show less"}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
