import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export interface AddImageDialogProps {
  open: boolean;
  handleAddImageUrl: (url: string) => void;
  onClose: () => void;
}

export default function AddImageDialog(props: AddImageDialogProps) {
  const [imageUrl, setImageUrl] = useState("");

  const handleClose = () => {
    props.onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleAddImage = () => {
    props.handleAddImageUrl(imageUrl);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={props.open}>
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
          variant="filled"
          value={imageUrl}
          onChange={handleInputChange}
          placeholder={imageUrl}
        />
        <Button onClick={handleAddImage}>Add</Button>
      </Box>
    </Dialog>
  );
}
