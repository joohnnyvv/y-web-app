import React from 'react';
import NavBar from "./Components/NavBar/NavBar";
import {createTheme, Paper, ThemeProvider} from "@mui/material";
import PostsList from "./Components/Posts/PostsList";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Paper
                style={{
                    minHeight: "100vh",
                    width: "100%",
                    overflowX: "hidden",
                    paddingBottom: 24,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderRadius: 0
                }}
                elevation={0}
            >
                <NavBar/>
                <PostsList />
            </Paper>
        </ThemeProvider>
    );
}

export default App;
