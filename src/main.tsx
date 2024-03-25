import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MovieContextProvider } from "./shared/Context.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <MovieContextProvider>
        <CssBaseline />
        <App />
      </MovieContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
