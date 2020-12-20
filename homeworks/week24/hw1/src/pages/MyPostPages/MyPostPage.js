import styled from "styled-components";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import MyPost from "../../components/MyPost";

import { getByUserId } from "../../redux/reducers/posts";

import Loading from "../../components/Loading";

const PostsWrapper = styled.div`
  box-sizing: border-box;
  margin: 50px auto;
  max-width: ${(props) => props.theme.wrapper.large};
`;

export default function MyPostPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.users.user);
  const postsByUserId = useSelector((store) => store.posts.byUserId);
  // 因為想要刪除後畫面重設才多設定 isPostLaoding
  // 但會 true 和 false 的時候都會抓一次，還不知怎麼解決
  // （本來想根據 postsByUserId，但會無限 loop）
  const isPostLoading = useSelector((store) => store.posts.isPostLoading);

  useEffect(() => {
    if (user) {
      // 根據目前登入的 userId 拿該 user 的文章
      dispatch(getByUserId(user.id));
    }
  }, [dispatch, isPostLoading, user]); // 一開始拿到的 user 會是 null，等拿到 user 再 ren 一次

  return (
    <PostsWrapper>
      {!user && <Loading />}
      {user &&
        postsByUserId &&
        postsByUserId.length > 0 &&
        postsByUserId.map((post) => <MyPost key={post.id} post={post} />)}
    </PostsWrapper>
  );
}
