import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/posts";
import usersReducer from "./reducers/users";

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

// This tells Redux that we want our top-level state object to have a field named posts inside,
// and all the data for state.posts will be updated by the postsReducer function when actions are dispatched.
