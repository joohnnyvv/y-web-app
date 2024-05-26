import { Box, Typography } from "@mui/material";
import React from "react";
import NavBar from "../../NavBar/NavBar";

export default function NotFoundPage() {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          width: "80%",
          display: "flex",
          padding: "30px 20px 0 20px",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h1">404 Page not found</Typography>
      </Box>
    </>
  );
}
