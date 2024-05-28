import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ActiveBadge } from "../../ActiveBadge/ActiveBadge";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddImageDialog from "../AddImageDialog/AddImageDialog";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";

export default function AddPostInput() {
  const [imgUrl, setImgUrl] = useState("");
  const [isAddImgDialogOpen, setIsAddImgDialogOpen] = useState(false);
  const [isImgUrlPresent, setIsImgUrlPresent] = useState(false);

  const handleAddImageUrl = (url: string) => {
    setImgUrl(url);
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
      }}
    >
      <Box>
        <ActiveBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" />
        </ActiveBadge>
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
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={() => setIsAddImgDialogOpen(true)}>
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
          <AddImageDialog
            open={isAddImgDialogOpen}
            handleAddImageUrl={handleAddImageUrl}
            onClose={() => setIsAddImgDialogOpen(false)}
          />
          <Button
            variant="contained"
            sx={{ maxWidth: "30%", alignSelf: "end", borderRadius: "14px" }}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
