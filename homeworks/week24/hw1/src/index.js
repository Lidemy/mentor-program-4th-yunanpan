import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = {
  colors: {
    primaryLighter: "#f7e8d5",
    primaryLight: "#f9ebdf",
    primary: "#FFBA84",
    primaryDark: "#E98B2A",
    primaryDarker: "#dc5034",
    secondaryLight: "#FCFAF2",
    secondary: "#fafafa",
    secondaryDark: "#F7C242",
    tertiaryLight: "#EBB471",
    tertiary: "#994639",
    loading: "#B54434",
  },
  wrapper: {
    large: "760px",
    medium: "420px",
  },
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
