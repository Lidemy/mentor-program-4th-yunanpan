import styled from "styled-components";

import Post from "../../components/Post";
import Loading from "../../components/Loading";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsCount } from "../../redux/reducers/posts";

const Wrapper = styled.div`
  position: relative;
`;

const PostsWrapper = styled.div`
  box-sizing: border-box;
  margin: 50px auto;
  max-width: ${(props) => props.theme.wrapper.large};
  height: 420px;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: -50px;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  max-width: 360px;
  justify-content: center;
`;

const PaginationButton = styled.button`
  text-decoration: none;
  background: ${(props) => props.theme.colors.primaryDarker};
  color: white;
  cursor: pointer;
  border: none;
  outline: none;
  width: 24px;
  height: 24px;
  text-align: center;

  & + & {
    margin-left: 5px;
  }

  &:hover {
    background: ${(props) => props.theme.colors.secondaryDark};
  }

  ${(props) =>
    props.$active &&
    `
    border: 1px solid ${props.theme.colors.primaryDarker};
    color: ${props.theme.colors.primaryDarker};
    background: white;
  `}
`;

export default function HomePage() {
  const dispatch = useDispatch();
  const totalPostsCount = useSelector((store) => store.posts.totalCount);
  const posts = useSelector((store) => store.posts.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [];
  const limit = 5;

  // 一開始拿所有的 posts 和總數
  useEffect(() => {
    dispatch(getPostsCount());
    dispatch(getPosts(currentPage, limit));
  }, [dispatch, currentPage]);

  const length = Math.ceil(totalPostsCount / limit);
  for (let i = 1; i <= length; i++) {
    pages.push(i);
  }

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Wrapper>
      {posts && posts.length === 0 && <Loading />}
      <PostsWrapper>
        {posts &&
          posts.length > 0 &&
          posts.map((post) => <Post key={post.id} post={post} />)}
      </PostsWrapper>
      <PaginationWrapper>
        {pages.map((page) => (
          <PaginationButton
            key={page}
            $active={page === currentPage}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PaginationButton>
        ))}
      </PaginationWrapper>
    </Wrapper>
  );
}
