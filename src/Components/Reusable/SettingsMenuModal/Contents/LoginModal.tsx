import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LoginRequestBody } from "../../../../Models/RequestBody/RequestBody";
import axios from "axios";
import { ApiPaths, apiUrl } from "../../../../Consts/Api";
import { User } from "../../../../Models/UserModel";
import { useAtom } from "jotai";
import {
  isLoadingAtom,
  isLoggedInAtom,
  loggedUserAtom,
} from "../../../../utils/Atoms";
import { useSnackbar } from "../../../../Context/SnackbarContext";

interface LoginModalProps {
  handleClose: () => void;
}

export default function LoginModal(props: LoginModalProps) {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [isLogged, setIsLogged] = useAtom(isLoggedInAtom);
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    if (!emailError && password && email) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [emailError, password, email]);

  useEffect(() => {
    if (email && !EMAIL_REGEX.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email]);

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value);
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
    const hashedPassword = await hashPassword(event.target.value);
    console.log(hashedPassword);
    setPassword(hashedPassword);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reqBody: LoginRequestBody = {
      email: email,
      password: password,
    };
    setIsLoading(true);
    axios
      .post(`${apiUrl}/${ApiPaths.USER.LOGIN}`, reqBody)
      .then((res) => {
        setIsLogged(true);
        setLoggedUser(res.data);
        openSnackbar("Logged in successfully", "success");
        props.handleClose();
      })
      .catch((error) => {
        openSnackbar("Wrong email or password", "error");
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box sx={{ display: "flex", gap: "40px", flexDirection: "column" }}>
      <Typography variant="h4" color="white">
        Log in
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <FormControl error={emailError}>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <OutlinedInput
              id="email-input"
              label="Email"
              onChange={(e) => handleEmailChange(e)}
            />
            {emailError ? (
              <FormHelperText id="component-error-text">
                Invalid email
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              onChange={(e) => handlePasswordChange(e)}
              type="password"
              id="password-input"
              label="Password"
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            width: "100%",
            justifyContent: "end",
            gap: "20px",
          }}
        >
          <Button variant="text" onClick={props.handleClose}>
            Close
          </Button>
          <Tooltip
            title={
              formValid ? "Log in" : "You must fill out the entire login form"
            }
          >
            <div>
              <Button variant="contained" disabled={!formValid} type="submit">
                Log in
              </Button>
            </div>
          </Tooltip>
        </Box>
      </form>
    </Box>
  );
}
