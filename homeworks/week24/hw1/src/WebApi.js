import { getAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";

export const getPostsApi = (page, limit) => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=${limit}`
  ).then((res) => res.json());
};

export const getAllPostsApi = () => {
  return fetch(`${BASE_URL}/posts`).then((res) => res.json());
};

export const getSinglePostsApi = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`).then((res) => res.json());
};

export const newPostApi = (title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

export const myPostApi = (userId) => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&userId=${userId}`
  ).then((res) => res.json());
};

export const updatePostApi = (id, title, body) => {
  console.log("enter updatePostApi ====");
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

export const deletePostApi = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
    }),
  }).then((res) => res.json());
};

export const loginApi = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const signupApi = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};
