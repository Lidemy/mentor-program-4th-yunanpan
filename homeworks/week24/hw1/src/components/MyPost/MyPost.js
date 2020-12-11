import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";

import { deletePost } from "../../redux/reducers/posts";

import { useDispatch } from "react-redux";

const PostItem = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 2px solid ${(props) => props.theme.colors.primaryDark};
  border-radius: 5px;
  width: 100%;

  & + & {
    margin-top: 10px;
  }

  &:hover {
    box-shadow: 0 4px 6px -4px ${(props) => props.theme.colors.primaryDarker};
  }
`;

const PostTitle = styled(Link)`
  flex: 1;
  font-size: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.tertiary};
  cursor: pointer;
  text-decoration: none;
`;

const PostDate = styled.div`
  margin-left: 5px;
  width: 84px;
  font-size: 16px;
  text-align: left;
  color: ${(props) => props.theme.colors.tertiaryLight};
`;

const PostUpdateButton = styled.button`
  margin-left: 5px;
  padding: 5px;
  background: white;
  color: ${(props) => props.theme.colors.primaryDarker};
  outline: none;
  border: 1px solid ${(props) => props.theme.colors.primaryDarker};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.primaryDarker};
    color: white;
  }
`;

const PostDeleteButton = styled(PostUpdateButton)``;

export default function MyPost({ post }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteClick = () => {
    dispatch(deletePost(post.id));
  };

  const handleUpdateClick = (id) => {
    history.push(`/update-post/${id}`);
  };

  return (
    <PostItem>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
      <PostUpdateButton onClick={() => handleUpdateClick(post.id)}>
        編輯
      </PostUpdateButton>
      <PostDeleteButton onClick={handleDeleteClick}>刪除</PostDeleteButton>
    </PostItem>
  );
}
