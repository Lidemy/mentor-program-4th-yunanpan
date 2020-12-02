import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { postPosts } from "../../WebApi";

const NewPostForm = styled.form`
  max-width: 480px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.primaryLight};
`;

const NewPostWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const NewPostTitle = styled.div`
  min-width: 60px;
  margin-right: 5px;
  padding: 5px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.fontSmall};
  color: ${(props) => props.theme.colors.primaryLighter};
  background: ${(props) => props.theme.colors.primaryDark};
`;

const NewPostInput = styled.input`
  box-sizing: border-box;
  padding: 0 5px;
  width: 100%;
`;

const NewPostContent = styled.textarea`
  box-sizing: border-box;
  display: block;
  width: 100%;
`;

const NewPostButton = styled.button`
  margin-top: 20px;
  padding: 5px;
  position: relative;
  width: 100%;
  border: none;
  font-size: ${(props) => props.theme.fontSize.fontSmall};
  color: ${(props) => props.theme.colors.primaryLighter};
  background: ${(props) => props.theme.colors.primaryDark};
  outline: none;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
`;

export default function NewPostPage() {
  const history = useHistory();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [errorMessage] = useState("不得為空");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (newPostTitle === "" || newPostContent === "") {
      return;
    }
    postPosts(newPostTitle, newPostContent).then((response) => {
      // {title: "1", body: "1", createdAt: 1605872648244, userId: 1, id: 59}
      // 送到新增的文章的單一頁面
      history.push(`/posts/${response.id}`);
    });
  };

  return (
    <NewPostForm onSubmit={handleNewPostSubmit}>
      {isSubmit && newPostTitle === "" && <Error>{errorMessage}</Error>}
      <NewPostWrapper>
        <NewPostTitle>文章標題</NewPostTitle>
        <NewPostInput
          value={newPostTitle}
          placeholder="請輸入文章標題"
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
      </NewPostWrapper>
      <NewPostContent
        rows="20"
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
      />
      {isSubmit && newPostContent === "" && <Error>{errorMessage}</Error>}
      <NewPostButton>送出文章</NewPostButton>
    </NewPostForm>
  );
}
