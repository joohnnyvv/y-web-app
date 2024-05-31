import { Box, Divider, Modal } from "@mui/material";
import React from "react";
import { Post } from "../../Models/PostModel";
import PostItem from "../Posts/PostItem/PostItem";
import { mockedComments } from "../../Mocks/mockedComments";
import CommentItem from "./CommentItem";

interface CommentsModalProps {
  post: Post;
  isOpen: boolean;
  handleClose: () => void;
}

const style = {
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
};

export default function CommentsModal(props: CommentsModalProps) {
  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="comments-modal"
      aria-describedby="comments-modal"
    >
      <Box maxWidth="sm" sx={style}>
        <PostItem post={props.post} />
        {mockedComments.map((comment) => (
          <div key={comment.id}>
            <CommentItem comment={comment} />
            <Divider sx={{ margin: "5px 0 5px 0" }} />
          </div>
        ))}
      </Box>
    </Modal>
  );
}
