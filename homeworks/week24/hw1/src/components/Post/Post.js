import styled from "styled-components";

import { Link } from "react-router-dom";

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

export default function Post({ post }) {
  return (
    <PostItem>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
    </PostItem>
  );
}
