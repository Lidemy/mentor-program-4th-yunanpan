import styled from "styled-components";
import { useContext } from "react";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";
import { Link, useLocation, useHistory } from "react-router-dom";

const Root = styled.div``;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-left: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primaryLighter};
  height: 52px;
  line-height: 52px;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    padding-left: 0px;
    line-height: 26px;
  }
`;

const NavTitle = styled.div`
  color: ${(props) => props.theme.colors.primaryDark};
  font-size: ${(props) => props.theme.fontSize.fontLarge};
  font-style: italic;

  ${MEDIA_QUERY_SM} {
    text-align: center;
  }
`;

const NavList = styled.div`
  display: flex;

  ${MEDIA_QUERY_SM} {
    justify-content: space-between;
  }
`;

const NavButton = styled(Link)`
  display: block;
  width: 100px;
  text-align: center;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primaryDark};
  font-size: ${(props) => props.theme.fontSize.fontSmall};

  ${(props) =>
    props.$active &&
    `
    background: ${props.theme.colors.primaryLighter};
  `}
`;

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname;
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") history.push("/");
  };

  return (
    <Root>
      <Navbar>
        <NavTitle>blog</NavTitle>
        <NavList>
          <NavButton $active={path === "/"} to="/">
            首頁
          </NavButton>
          <NavButton $active={path === "/about"} to="/about">
            關於我
          </NavButton>
          {user && (
            <NavButton $active={path === "/new-post"} to="new-post">
              新增文章
            </NavButton>
          )}
          {!user && (
            <NavButton $active={path === "/login"} to="/login">
              登入
            </NavButton>
          )}
          {!user && (
            <NavButton $active={path === "/register"} to="/register">
              註冊
            </NavButton>
          )}
          {user && <NavButton onClick={handleLogout}>登出</NavButton>}
        </NavList>
      </Navbar>
    </Root>
  );
}
