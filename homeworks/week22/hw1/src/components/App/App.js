import styled from "styled-components";
import { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Header";
import HomePage from "../../pages/HomePages";
import LoginPage from "../../pages/LoginPages";
import PostPage from "../../pages/PostPages";
import NewPostPage from "../../pages/NewPostPages";
import AboutPage from "../../pages/AboutPages";
import RegisterPage from "../../pages/RegisterPages";
import { AuthContext } from "../../contexts";
import { getMe } from "../../WebApi";
import { getAuthToken } from "../../utils";

const Root = styled.div``;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          {!isLoading && <Header />}
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/posts/:slug">
              <PostPage />
            </Route>
            <Route exact path="/new-post">
              <NewPostPage />
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
