import styled from "styled-components";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPosts, getTotalPosts } from "../../WebApi";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";

const Root = styled.div``;

const PostsWrapper = styled.div`
  height: 80vh;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px 20px;
  margin: 0px 40px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primaryLighter};

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;

const PostTitle = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.primaryDark};
  font-size: ${(props) => props.theme.fontSize.fontMedium};
  line-height: ${(props) => props.theme.fontSize.fontLarge};
`;

const PostDate = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSize.fontSmall};
  line-height: ${(props) => props.theme.fontSize.fontLarge};
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

function Pagination({ setCurrentPage, currentPage, totalPages }) {
  const handlePaginationClick = (e) => {
    const page = e.target.innerText;
    // 上一頁
    if (page === "prev" && currentPage !== "1") {
      return setCurrentPage(Number(currentPage) - 1);
    }
    // 下一頁
    if (page === "next" && Number(currentPage) !== totalPages.length) {
      return setCurrentPage(Number(currentPage) + 1);
    }
    // 第一頁
    if (page === "first") {
      return setCurrentPage(1);
    }
    // 最後一頁
    if (page === "last") {
      return setCurrentPage(totalPages.length);
    }
    // 按頁數
    if (page !== "prev" && page !== "next") {
      return setCurrentPage(page);
    }
  };

  return (
    <PaginationWrapper>
      <PaginationButton onClick={handlePaginationClick}>first</PaginationButton>
      <PaginationButton onClick={handlePaginationClick}>prev</PaginationButton>
      {totalPages.map((page, index) => (
        <PaginationButton key={index} onClick={handlePaginationClick}>
          {page}
        </PaginationButton>
      ))}
      <PaginationButton onClick={handlePaginationClick}>next</PaginationButton>
      <PaginationButton onClick={handlePaginationClick}>last</PaginationButton>
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px;
  border: none;
  border-radius: 3px;
  color: ${(props) => props.theme.colors.primaryDarker};
  background: ${(props) => props.theme.colors.primaryLighter};
  font-size: ${(props) => props.theme.fontSize.fontSmall};
  cursor: pointer;
`;

const Loading = styled.div`
  position: absolute;
  margin-top: 200px;
  padding: 100px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 240px;
  border-radius: 20px;
  background: ${(props) => props.theme.colors.primaryDark};

  &:before {
    content: "Loading...";
    display: block;
    text-align: center;
    color: ${(props) => props.theme.colors.primaryLighter};
    font-size: ${(props) => props.theme.fontSize.fontLarge};
  }
`;

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState("1");
  const limit = 5;
  const [totalPages, setTotalPages] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  // 拿總數 -> 頁數
  useEffect(() => {
    getTotalPosts().then((posts) => {
      const total = Math.ceil(posts.length / limit);
      for (let i = 1; i <= total; i++) {
        setTotalPages((totalPages) => [...totalPages, i]);
      }
      setIsPostsLoading(false);
    });
  }, []);

  useEffect(() => {
    getPosts(currentPage, limit).then((posts) => {
      setPosts(posts);
    });
  }, [currentPage]);

  return (
    <Root>
      {isPostsLoading && <Loading />}
      {!isPostsLoading && (
        <PostsWrapper>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </PostsWrapper>
      )}
      {!isPostsLoading && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </Root>
  );
}
