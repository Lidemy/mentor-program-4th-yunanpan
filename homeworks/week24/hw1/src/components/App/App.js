import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import HomePage from "../../pages/HomePages";
import AboutPage from "../../pages/AboutPages";
import LoginPage from "../../pages/LoginPages";
import SignupPage from "../../pages/SignupPages";
import NewPostPage from "../../pages/NewPostPages";
import SinglePostPage from "../../pages/SinglePostPages";
import MyPostPage from "../../pages/MyPostPages";
import UpdatePostPage from "../../pages/UpdatePostPages";

import Navbar from "../Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/add-new-post">
          <NewPostPage />
        </Route>
        <Route path="/posts/:slug">
          <SinglePostPage />
        </Route>
        <Route path="/my-post">
          <MyPostPage />
        </Route>
        <Route path="/update-post/:slug">
          <UpdatePostPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
