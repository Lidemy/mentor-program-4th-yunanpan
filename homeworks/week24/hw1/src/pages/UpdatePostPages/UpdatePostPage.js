import styled from "styled-components";

import { CUSTOM_INPUT_FOCUS } from "../../constants/standard";

import { useHistory, useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getPost, updatePost } from "../../redux/reducers/posts";

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

export default function UpdatePostPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const post = useSelector((store) => store.posts.post);
  const user = useSelector((store) => store.users.user);

  useEffect(() => {
    dispatch(getPost(slug));
  }, [dispatch, slug]);

  const handleUpdatePostSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost(slug, title, content));
    history.push(`/posts/${slug}`);
  };

  // 參考 Redux 文件的，防止使用者沒登入或沒輸入內容就送出
  const canSave = Boolean(title) && Boolean(content) && Boolean(user);

  return (
    <PostWrapper onSubmit={handleUpdatePostSubmit}>
      <PostTitle
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder={post && post.title}
      />
      <PostContent
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="20"
        placeholder={post && post.body}
      />
      <FormSubmitButton disabled={!canSave}>送出</FormSubmitButton>
    </PostWrapper>
  );
}
