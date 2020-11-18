import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primaryDarker: "#003f69",
    primaryDark: "#0169a4",
    primary: "#8db9ca",
    primaryLight: "#74d2e7",
    primaryLighter: "#c4dff6",

    secondaryLight: "#f2f6fa",
    secondary: "#ffed00",
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
