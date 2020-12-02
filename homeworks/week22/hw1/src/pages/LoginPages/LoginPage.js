import styled from "styled-components";
import { useState, useContext } from "react";

import { useHistory } from "react-router-dom";
import { login, getMe } from "../../WebApi";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;

const LoginForm = styled.form`
  max-width: 480px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.primaryLight};
`;

const LoginInputWrapper = styled.div`
  margin: auto;
  width: 60%;

  & + & {
    margin-top: 20px;
  }
`;

const LoginInputTitle = styled.div`
  color: ${(props) => props.theme.colors.primaryDark};
`;

const LoginInput = styled.input`
  box-sizing: border-box;
  margin-top: 5px;
  padding: 2px 5px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.primaryDark};
  outline: none;
`;

const LoginButton = styled.button`
  margin-top: 20px;
  padding: 5px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  border: none;
  color: ${(props) => props.theme.colors.primaryLighter};
  background: ${(props) => props.theme.colors.primaryDark};
  outline: none;
`;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoadingLogin) {
      return;
    }
    setIsLoadingLogin(true);
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        setIsLoadingLogin(false);
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
          setIsLoadingLogin(false);
          return setErrorMessage(response.message);
        }
        setUser(response.data);
        setIsLoadingLogin(false);
        history.push("/");
      });
    });
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <LoginInputWrapper>
        <LoginInputTitle>username:</LoginInputTitle>
        <LoginInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </LoginInputWrapper>
      <LoginInputWrapper>
        <LoginInputTitle>password:</LoginInputTitle>
        <LoginInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </LoginInputWrapper>
      <LoginButton>{isLoadingLogin ? "登入中…" : "登入"}</LoginButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </LoginForm>
  );
}
