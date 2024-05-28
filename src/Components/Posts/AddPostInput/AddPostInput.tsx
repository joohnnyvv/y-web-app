import { Avatar, Box, Button, Paper, TextField } from "@mui/material";
import React from "react";
import { ActiveBadge } from "../../ActiveBadge/ActiveBadge";

export default function AddPostInput() {
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
        <Button
          variant="contained"
          sx={{ maxWidth: "30%", alignSelf: "end", borderRadius: "14px" }}
        >
          Post
        </Button>
      </Box>
    </Paper>
  );
}
