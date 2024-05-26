import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { popularUsers } from "../../Mocks/popularUsers";
import PopularUserItem from "./PopularUserItem/PopularUserItem";
import { mockedPosts } from "../../Mocks/posts";
import PostItem from "../Posts/PostItem/PostItem";

interface TrendingPapersProps {
  header: string;
  typeOfContent: "users" | "posts";
  collapsedSize: number;
  side: "left" | "right";
  disableCollapse?: boolean;
}

export default function TrendingPapers(props: TrendingPapersProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const positionStyle =
    props.side === "left" ? { left: "70px" } : { right: "70px" };

  return (
    <Box
      maxWidth="sm"
      sx={{
        width: "20%",
        paddingTop: "20px",
        position: "fixed",
        ...positionStyle,
      }}
    >
      <Paper
        variant="outlined"
        sx={{ width: "100%", padding: "16px", borderRadius: "24px" }}
      >
        <Box>
          <Typography variant="h4">{props.header}</Typography>
          <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
          <Collapse
            collapsedSize={props.collapsedSize}
            in={isCollapsed}
            sx={{ padding: "6px" }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                paddingBottom: "10px",
              }}
            >
              {props.typeOfContent === "users"
                ? popularUsers.map((user, index) => (
                    <PopularUserItem key={index} user={user} />
                  ))
                : mockedPosts.map((post) => (
                    <PostItem key={post.id} post={post} />
                  ))}
            </Box>
          </Collapse>
        </Box>
        {props.disableCollapse ? (
          ""
        ) : (
          <Typography
            variant="caption"
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            sx={{ cursor: "pointer", color: "grey", right: 0 }}
          >
            {!isCollapsed ? "Show more" : "Show less"}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
