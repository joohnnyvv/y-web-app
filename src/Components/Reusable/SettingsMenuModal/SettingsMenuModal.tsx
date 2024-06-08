import { Box, Modal } from "@mui/material";
import React from "react";
import LoginModal from "./Contents/LoginModal";
import RegisterModal from "./Contents/RegisterModal";
import { Height } from "@mui/icons-material";
// @ts-ignore
import AppLogo from "../../../Assets/AppLogo/app-logo.png";

const settingsMenuModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface SettingsMenuModalProps {
  isOpen: boolean;
  case: "Profile" | "Logout" | "Log in" | "Sign in";
  handleClose: () => void;
}

export default function SettingsMenuModal(props: SettingsMenuModalProps) {
  return (
    <Modal
      onClose={props.handleClose}
      open={props.isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={settingsMenuModalStyle}>
        {props.case === "Log in" ? (
          <LoginModal handleClose={props.handleClose} />
        ) : props.case === "Sign in" ? (
          <RegisterModal handleClose={props.handleClose} />
        ) : (
          "<LoginModal />"
        )}
      </Box>
    </Modal>
  );
}
