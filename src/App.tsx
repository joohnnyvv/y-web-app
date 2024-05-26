import React, { useEffect } from "react";
import NavBar from "./Components/NavBar/NavBar";
import {
  Box,
  createTheme,
  Paper,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import PostsList from "./Components/Posts/PostsList";
import { useAtom } from "jotai";
import { themeAtom } from "./utils/Atoms";
import TrendingPapers from "./Components/TrendingPapers/TrendingPapers";
import HomePage from "./Components/Pages/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./Components/Pages/NotFoundPage/NotFoundPage";

function App() {
  const [theme, setTheme] = useAtom(themeAtom);

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
  ]);

  useEffect(() => {
    setTheme(userTheme);
  }, [userTheme]);

  return (
    <ThemeProvider theme={darkTheme}>
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
        }}
        elevation={0}
      >
        <RouterProvider router={router} />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
