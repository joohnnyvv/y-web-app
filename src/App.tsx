import {
  createTheme,
  Paper,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage/HomePage";
import NotFoundPage from "./Components/Pages/NotFoundPage/NotFoundPage";
import ProfilePage from "./Components/Pages/ProfilePage/ProfilePage";
import useStompClient from "./Consts/UseStompClient";
import { SnackbarProvider } from "./Context/SnackbarContext";
import {
  commentFromWsAtom,
  isLoggedInAtom,
  loggedUserAtom,
  themeAtom,
} from "./utils/Atoms";

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
