import { createSlice } from "@reduxjs/toolkit";

import { loginApi, getMe, signupApi } from "../../WebApi";

export const usersReducer = createSlice({
  name: "users",
  initialState: {
    user: null,
    isLoading: true,
  },
  reducers: {
    // (state, action) => new state
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setIsUserLoading } = usersReducer.actions;

// thunk async logic
export const login = (username, password) => () => {
  return loginApi(username, password);
};

export const userVertification = () => () => {
  return getMe();
};

export const getUser = (user) => (dispatch) => {
  dispatch(setUser(user));
};

export const signup = (nickname, username, password) => () => {
  return signupApi(nickname, username, password);
};

export default usersReducer.reducer;
