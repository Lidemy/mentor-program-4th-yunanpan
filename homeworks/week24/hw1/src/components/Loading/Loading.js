import styled from "styled-components";

const LoadingDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  line-height: 100vh;
  background: transparent;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.loading};
`;

export default function Loading() {
  return <LoadingDiv>Loading...</LoadingDiv>;
}
