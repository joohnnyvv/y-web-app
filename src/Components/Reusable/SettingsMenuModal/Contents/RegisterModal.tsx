import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { RegisterRequestBody } from "../../../../Models/RequestBody/RequestBody";
import axios from "axios";
import { ApiPaths, apiUrl } from "../../../../Consts/Api";
import { UserAvatarColors } from "../../../../Models/UserModel";
import { useSnackbar } from "../../../../Context/SnackbarContext";
import "./register-modal.css";
import { useAtom } from "jotai";
import { themeAtom } from "../../../../utils/Atoms";

interface RegisterModalProps {
  handleClose: () => void;
}

export default function RegisterModal(props: RegisterModalProps) {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordDontMatch, setPasswordDontMatch] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [avatarColor, setAvatarColor] = useState<UserAvatarColors>(
    UserAvatarColors.DARK_BLUE
  );
  const [mailTaken, setMailTaken] = useState(false);
  const { openSnackbar } = useSnackbar();
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    if (email && !EMAIL_REGEX.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email]);

  useEffect(() => {
    setPasswordDontMatch(hashedPassword !== repeatPassword);
  }, [repeatPassword, hashedPassword]);

  useEffect(() => {
    if (
      email &&
      !emailError &&
      name &&
      lastName &&
      hashedPassword &&
      repeatPassword &&
      !passwordDontMatch
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    email,
    emailError,
    name,
    lastName,
    hashedPassword,
    repeatPassword,
    passwordDontMatch,
  ]);

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLastName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reqBody: RegisterRequestBody = {
      name: name,
      lastName: lastName,
      avatarColor: avatarColor,
      email: email,
      password: hashedPassword,
    };
    axios
      .post(`${apiUrl}/${ApiPaths.USER.REGISTER}`, reqBody)
      .then((res) => {
        props.handleClose();
        openSnackbar("Account created", "success");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setMailTaken(true);
          openSnackbar(error.message, "error");
        } else {
          openSnackbar(error.message, "error");
          console.error(error);
        }
      });
  };

  const hashPassword = async (password: string) => {
    const passwordBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handlePasswordChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newPassword = event.target.value;
    const hashed = await hashPassword(newPassword);
    setHashedPassword(hashed);
  };

  const handleRepeatPasswordChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newPassword = event.target.value;
    const hashed = await hashPassword(newPassword);
    setRepeatPassword(hashed);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "40px", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Avatar
            sx={{
              bgcolor: avatarColor,
              color: "white",
              height: "6rem",
              width: "6rem",
              fontSize: "3rem",
              alignSelf: "center",
            }}
          >
            X
          </Avatar>
          <Container
            disableGutters
            sx={{
              marginTop: "10px",
              width: "100%",
              overflowX: "scroll",
              display: "flex",
              gap: "8px",
              padding: "0 6px 6px 6px",
            }}
            className="colors"
          >
            {Object.values(UserAvatarColors)
              .slice()
              .map((color) => (
                <Box
                  sx={{
                    backgroundColor: color,
                    height: "40px",
                    minWidth: "40px",
                    borderRadius: "50%",
                  }}
                  onClick={() => setAvatarColor(color)}
                ></Box>
              ))}
          </Container>
          <Typography
            variant="h4"
            color={theme === "light" ? "black" : "white"}
            sx={{ marginTop: "12px" }}
          >
            Sign in
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
            <FormControl>
              <InputLabel htmlFor="name-input">Name</InputLabel>
              <OutlinedInput
                id="name-input"
                label="Name"
                onChange={handleNameChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="last-name-input">Last name</InputLabel>
              <OutlinedInput
                id="last-name-input"
                label="Last name"
                onChange={handleLastNameChange}
              />
            </FormControl>
            <FormControl error={emailError}>
              <InputLabel htmlFor="email-input">Email</InputLabel>
              <OutlinedInput
                id="email-input"
                label="Email"
                onChange={handleEmailChange}
              />
              {emailError && (
                <FormHelperText id="component-error-text">
                  Invalid email
                </FormHelperText>
              )}
              {mailTaken && (
                <FormHelperText id="component-error-text">
                  Email taken
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password-input">Password</InputLabel>
              <OutlinedInput
                onChange={handlePasswordChange}
                type="password"
                id="password-input"
                label="Password"
              />
            </FormControl>
            <FormControl error={passwordDontMatch}>
              <InputLabel htmlFor="repeat-password-input">
                Repeat password
              </InputLabel>
              <OutlinedInput
                onChange={handleRepeatPasswordChange}
                type="password"
                id="repeat-password-input"
                label="Repeat password"
              />
              {passwordDontMatch && (
                <FormHelperText id="password-match-helper">
                  Passwords don't match
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "end",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Button variant="text" onClick={props.handleClose}>
              Close
            </Button>
            <Tooltip
              title={
                formValid
                  ? "Sign in"
                  : "You must fill out the entire registration form"
              }
            >
              <div>
                <Button variant="contained" disabled={!formValid} type="submit">
                  Sign in
                </Button>
              </div>
            </Tooltip>
          </Box>
        </form>
      </Box>
    </>
  );
}
