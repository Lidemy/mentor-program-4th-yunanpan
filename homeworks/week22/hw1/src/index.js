import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primaryLighter: "#dbeede",
    primaryLight: "#B1B479",
    primary: "#939650",
    primaryDark: "#616138",
  },
  fontSize: {
    fontTitle: "32px",
    fontLarge: "24px",
    fontMedium: "18px",
    fontSmall: "14px",
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
