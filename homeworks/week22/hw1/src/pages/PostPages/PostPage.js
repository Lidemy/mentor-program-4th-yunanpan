import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../WebApi";

const PostWrapper = styled.div`
  margin: 40px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.primaryLight};
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primaryLight};
  line-height: ${(props) => props.theme.fontSize.fontMedium};
`;

const PostTitle = styled.div`
  color: ${(props) => props.theme.colors.primaryDark};
  font-size: ${(props) => props.theme.fontSize.fontMedium};
`;

const PostDate = styled.div`
  font-size: ${(props) => props.theme.fontSize.fontSmall};
  color: ${(props) => props.theme.colors.primaryLight};
`;

const PostContent = styled.div`
  margin-top: 20px;
  color: ${(props) => props.theme.colors.primaryDark};
  line-height: ${(props) => props.theme.fontSize.fontLarge};
  word-break: break-all;
  text-align: justify;
`;

export default function PostPage() {
  let { slug } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    getPost(slug).then((post) => {
      setPost(post);
    });
  }, [slug]);

  return (
    <div>
      {post && (
        <PostWrapper>
          <PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
          </PostHeader>
          <PostContent>{post.body}</PostContent>
        </PostWrapper>
      )}
    </div>
  );
}
