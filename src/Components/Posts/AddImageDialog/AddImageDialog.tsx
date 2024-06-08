import { Box, Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";

export interface AddImageDialogProps {
  open: boolean;
  handleAddImageUrl: (url: string) => void;
  onClose: () => void;
  addedImgUrl: string;
}

export default function AddImageDialog(props: AddImageDialogProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setError("");
    setImageUrl("");
    props.onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setError("");
  };

  const validateImageUrl = async (url: string) => {
    if (!url) {
      return true;
    }
    try {
      const response = await fetch(url, { method: "HEAD" });
      const contentType = response.headers.get("Content-Type");
      return contentType && contentType.startsWith("image/");
    } catch (error) {
      console.error("Error validating image URL:", error);
      return false;
    }
  };

  const handleAddImage = async () => {
    const isValidImage = await validateImageUrl(imageUrl);
    if (isValidImage) {
      props.handleAddImageUrl(imageUrl);
      handleClose();
    } else {
      setError("The URL does not point to a valid image.");
    }
  };

  return (
    <Box
      sx={{
        padding: "15px 10px 5px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <TextField
        fullWidth
        id="img-url-field"
        label="Image link"
        variant="outlined"
        value={imageUrl}
        onChange={handleInputChange}
        placeholder={"Add image url here"}
        error={!!error}
        helperText={error}
      />
      <Button onClick={handleAddImage}>Add</Button>
    </Box>
  );
}
