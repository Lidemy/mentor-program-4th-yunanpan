import { createSlice } from "@reduxjs/toolkit";

import {
  getPostsApi,
  getSinglePostsApi,
  myPostApi,
  deletePostApi,
  getAllPostsApi,
  updatePostApi,
} from "../../WebApi";

export const postsReducer = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    byUserId: [],
    isPostLoading: false,
    totalCount: null,
  },
  reducers: {
    // (state, action) => new state
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    setSinglePost: (state, action) => {
      state.post = action.payload;
    },

    setByUserId: (state, action) => {
      state.byUserId = action.payload;
    },

    setIsPostLoading: (state, action) => {
      state.isPostLoading = action.payload;
    },

    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const {
  setPosts,
  setSinglePost,
  setByUserId,
  setIsPostLoading,
  setTotalCount,
} = postsReducer.actions;

// thunk async logic
export const getPostsCount = () => (dispatch) => {
  getAllPostsApi()
    .then((res) => {
      dispatch(setTotalCount(res.length));
    })
    .catch((err) => console.log("err", err));
};

export const getPosts = (page, limit) => (dispatch) => {
  getPostsApi(page, limit)
    .then((res) => {
      dispatch(setPosts(res));
    })
    .catch((err) => console.log("err", err));
};

export const getPost = (id) => (dispatch) => {
  getSinglePostsApi(id)
    .then((res) => dispatch(setSinglePost(res)))
    .catch((err) => console.log(err));
};

export const getByUserId = (userId) => (dispatch) => {
  myPostApi(userId)
    .then((res) => dispatch(setByUserId(res)))
    .catch((err) => console.log(err));
};

export const updatePost = (postId, title, body) => (dispatch) => {
  updatePostApi(postId, title, body)
    .then((res) => dispatch(setSinglePost(res)))
    .catch((err) => console.log(err));
};

export const deletePost = (postId) => (dispatch) => {
  dispatch(setIsPostLoading(true));
  deletePostApi(postId).then(() => {
    dispatch(setIsPostLoading(false));
  });
};

export default postsReducer.reducer;
