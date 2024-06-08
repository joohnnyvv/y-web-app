import React, { useEffect, useRef } from "react";
import {
  Box,
  createTheme,
  Paper,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useAtom } from "jotai";
import {
  commentFromWsAtom,
  isLoggedInAtom,
  loggedUserAtom,
  themeAtom,
} from "./utils/Atoms";
import HomePage from "./Components/Pages/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./Components/Pages/NotFoundPage/NotFoundPage";
import ProfilePage from "./Components/Pages/ProfilePage/ProfilePage";
import { apiUrl, wsUrl } from "./Consts/Api";
import { SnackbarProvider } from "./Context/SnackbarContext";
import useWebSocketConnection from "./Consts/UseStompClient";
import useStompClient from "./Consts/UseStompClient";

function App() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const [isLogged, setIsLogged] = useAtom(isLoggedInAtom);
  const [commentFromWs, setCommentFromWs] = useAtom(commentFromWsAtom);
  const messages = useStompClient("ws://localhost:8080/ws");

  useEffect(() => {
    if (messages.length > 0) {
      setCommentFromWs(JSON.parse(messages[messages.length - 1]));
    }
  }, [messages]);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser) {
      setLoggedUser(JSON.parse(savedUser));
      setIsLogged(true);
    }
  }, [setLoggedUser]);

  useEffect(() => {
    if (loggedUser) {
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    } else {
      localStorage.removeItem("loggedUser");
    }
  }, [loggedUser]);

  const userTheme = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/profile/:userId",
      element: <ProfilePage />,
    },
  ]);

  useEffect(() => {
    setTheme(userTheme);
    console.log(wsUrl);
    console.log(apiUrl);
  }, [userTheme]);

  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider>
        <Paper
          style={{
            minHeight: "100vh",
            width: "100%",
            paddingBottom: 24,
            paddingTop: "78px",
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: 0,
            overflowX: "hidden",
          }}
          elevation={0}
        >
          <RouterProvider router={router} />
        </Paper>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
