import styled from "styled-components";

import { CUSTOM_INPUT_FOCUS } from "../../constants/standard";

import { useHistory } from "react-router-dom";

import { useState } from "react";

import { useSelector } from "react-redux";

import { newPostApi } from "../../WebApi";

const PostWrapper = styled.form`
  box-sizing: border-box;
  margin: 50px auto;
  padding: 60px;
  max-width: ${(props) => props.theme.wrapper.large};
  border: 2px solid ${(props) => props.theme.colors.primaryDark};
  border-radius: 5px;
  background: ${(props) => props.theme.colors.secondaryLight};
`;

const PostTitle = styled.input`
  font-size: 20px;
  border: 0.5px solid ${(props) => props.theme.colors.primaryDark};
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.tertiary};

  &:focus {
    box-shadow: 0px 0px 0px 1px ${(props) => props.theme.colors.primaryDark};
  }

  ${CUSTOM_INPUT_FOCUS}
`;

const PostContent = styled.textarea`
  font-size: 14px;
  border: 0.5px solid ${(props) => props.theme.colors.primaryDark};
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.tertiary};

  &:focus {
    box-shadow: 0px 0px 0px 1px ${(props) => props.theme.colors.primaryDark};
  }

  ${CUSTOM_INPUT_FOCUS}
`;

const FormSubmitButton = styled.button`
  display: block;
  margin: auto;
  padding: 5px 0;
  width: 160px;
  background: ${(props) => props.theme.colors.primaryDark};
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  transition: all 0.5s ease-out;

  &:disabled {
    opacity: 0;
    cursor: auto;
  }
`;

export default function NewPostPage() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useSelector((store) => store.users.user);

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    newPostApi(title, content).then((res) => {
      history.push(`/posts/${res.id}`);
    });
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(user);

  return (
    <PostWrapper onSubmit={handleNewPostSubmit}>
      <PostTitle
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title..."
      />
      <PostContent
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="20"
        placeholder="Content..."
      />
      <FormSubmitButton disabled={!canSave}>送出</FormSubmitButton>
    </PostWrapper>
  );
}
