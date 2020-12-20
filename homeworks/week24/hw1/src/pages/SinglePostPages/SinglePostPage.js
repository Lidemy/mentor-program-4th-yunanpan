import styled from "styled-components";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getPost, setSinglePost } from "../../redux/reducers/posts";
import { useEffect } from "react";

import Loading from "../../components/Loading";

const PostWrapper = styled.div`
  box-sizing: border-box;
  margin: 50px auto;
  padding: 60px;
  max-width: ${(props) => props.theme.wrapper.large};
  border: 2px solid ${(props) => props.theme.colors.primaryDark};
  border-radius: 5px;
  background: white;
`;

const PostTitle = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 24px;
  font-weight: bold;
`;

const PostContent = styled.div`
  margin-top: 20px;
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 16px;
  line-height: 20px;
  text-align: justify;
  white-space: pre-wrap;
`;

export default function SinglePostPage() {
  const dispatch = useDispatch();
  const { slug } = useParams(); // id
  const post = useSelector((store) => store.posts.post);

  useEffect(() => {
    dispatch(getPost(slug));
    return dispatch(setSinglePost(null));
  }, [slug, dispatch]);

  return (
    <div>
      {!post && <Loading />}
      {post && (
        <PostWrapper>
          <div>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.body}</PostContent>
          </div>
        </PostWrapper>
      )}
    </div>
  );
}
