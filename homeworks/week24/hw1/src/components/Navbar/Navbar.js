import styled from "styled-components";

import { Link, useHistory, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { setAuthToken } from "../../utils";

import {
  getUser,
  userVertification,
  setIsUserLoading,
} from "../../redux/reducers/users";
import { useEffect } from "react";

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-left: 20px;
  background: ${(props) => props.theme.colors.primaryLight};
  box-shadow: inset 0px -4px 3px -4px
    ${(props) => props.theme.colors.primaryDark};

  height: 60px;
`;

const HomeButton = styled(Link)`
  border: none;
  background: none;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 26px;
  font-style: italic;
  font-weight: bold;
  text-shadow: 2px 2px ${(props) => props.theme.colors.primaryDark};
  color: white;
  outline: none;
  line-height: 60px;
`;

const NavbarButtonWrapper = styled.div`
  display: flex;

  ${(props) =>
    props.isUserLoading &&
    `
    display: none;
  `}
`;

const NavbarButton = styled(Link)`
  position: relative;
  width: 120px;
  border-right: 3px solid ${(props) => props.theme.colors.primaryDark};
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: ${(props) => props.theme.colors.secondary};

  background: ${(props) => props.theme.colors.primary};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  line-height: 40px;
  height: 40px;

  ${(props) =>
    props.$active &&
    `
    background: ${props.theme.colors.secondary};
    color: ${props.theme.colors.primary};
  `}

  &:after {
    content: "";
    position: absolute;
    bottom: 5px;
    transform: translateX(-50%);
    left: 50%;
    border-bottom: 2px solid ${(props) => props.theme.colors.primaryLight};
    width: 0;
    transition: all 0.5s linear;
  }

  &:hover {
    &:after {
      width: 80%;
    }
  }
`;

const AboutButton = styled(NavbarButton)``;
const LoginButton = styled(NavbarButton)``;
const LogoutButton = styled(NavbarButton)``;
const SignUpButton = styled(NavbarButton)``;

export default function Navbar() {
  const user = useSelector((store) => store.users.user);
  const isUserLoading = useSelector((store) => store.users.isLoading);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // 因為在 refresh 的時候 store 會被初始化...暫且先這樣
  useEffect(() => {
    // dispatch(setIsUserLoading(true));
    // navbar 會先跳出登入畫面 -> 要設置 loading
    dispatch(userVertification()).then((res) => {
      dispatch(getUser(res.data));
      dispatch(setIsUserLoading(false));
    });
  }, [dispatch]);

  const handleLogoutClick = () => {
    setAuthToken("");
    dispatch(getUser(null));
    if (location.pathname !== "/") history.push("/");
  };

  return (
    <NavbarWrapper>
      <HomeButton to="/">Blog</HomeButton>
      <NavbarButtonWrapper isUserLoading={isUserLoading}>
        <AboutButton $active={location.pathname === "/about"} to="/about">
          關於我
        </AboutButton>
        {!user && (
          <SignUpButton $active={location.pathname === "/signup"} to="/signup">
            註冊
          </SignUpButton>
        )}
        {!user && (
          <LoginButton $active={location.pathname === "/login"} to="/login">
            登入
          </LoginButton>
        )}
        {user && (
          <LoginButton $active={location.pathname === "/my-post"} to="/my-post">
            我的文章
          </LoginButton>
        )}
        {user && (
          <LoginButton
            $active={location.pathname === "/add-new-post"}
            to="/add-new-post"
          >
            新增文章
          </LoginButton>
        )}
        {user && <LogoutButton onClick={handleLogoutClick}>登出</LogoutButton>}
      </NavbarButtonWrapper>
    </NavbarWrapper>
  );
}
