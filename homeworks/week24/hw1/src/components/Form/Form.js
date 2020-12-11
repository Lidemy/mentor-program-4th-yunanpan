import styled from "styled-components";
import { TITLE_STANDARD } from "../../constants/standard";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setAuthToken } from "../../utils";

import {
  login,
  userVertification,
  signup,
  getUser,
} from "../../redux/reducers/users";

const FormWrapper = styled.form`
  margin: 50px auto;
  padding: 20px 60px;
  max-width: ${(props) => props.theme.wrapper.medium};
  border: 1px solid black;
  border-radius: 5px;
`;

const FormTitle = styled.div`
  ${TITLE_STANDARD}
`;

const FormItem = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

const FormItemInput = styled.input`
  box-sizing: border-box;
  margin-top: 5px;
  width: 100%;
`;

const FormSubmitButton = styled.button`
  display: block;
  margin: 50px auto 20px auto;
  padding: 5px 0;
  width: 160px;
  background: black;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const Error = styled.div`
  position: absolute;
  color: red;
  font-size: 14px;
`;

export default function Form({ formName }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formName === "Log In") {
      dispatch(login(username, password)).then((res) => {
        if (res.ok !== 1) {
          setErrorMessage(res.message);
        } else {
          setAuthToken(res.token);
          dispatch(userVertification()).then((res) => {
            if (res.ok !== 1) {
              setErrorMessage(res.message);
            } else {
              dispatch(getUser(res.data));
              history.push("/");
            }
          });
        }
      });
    } else if (formName === "Sign Up") {
      // sign up logic
      dispatch(signup(nickname, username, password)).then((res) => {
        if (res.ok !== 1) {
          setErrorMessage(res.message);
        } else {
          setAuthToken(res.token);
          dispatch(userVertification()).then((res) => {
            if (res.ok !== 1) {
              setErrorMessage(res.message);
            } else {
              dispatch(getUser(res.data));
              history.push("/");
            }
          });
        }
      });
    } else {
      console.log("不知名表單");
    }
  };

  return (
    <FormWrapper onSubmit={(e) => handleFormSubmit(e)}>
      <FormTitle>{formName}</FormTitle>
      {formName === "Sign Up" && (
        <FormItem>
          nickname:
          <FormItemInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </FormItem>
      )}
      <FormItem>
        username:
        <FormItemInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormItem>
      <FormItem>
        password:
        <FormItemInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormItem>
      {errorMessage && <Error>{errorMessage}</Error>}
      <FormSubmitButton>送出</FormSubmitButton>
    </FormWrapper>
  );
}
