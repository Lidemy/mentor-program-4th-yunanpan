import styled from "styled-components";
import { TITLE_STANDARD } from "../../constants/standard";

const Wrapper = styled.div`
  box-sizing: border-box;
  margin: 50px auto;
  padding: 20px;
  max-width: ${(props) => props.theme.wrapper.large};
  border: 2px solid ${(props) => props.theme.colors.primaryDark};
  border-radius: 5px;
  text-align: center;
`;

const AboutTitle = styled.div`
  ${TITLE_STANDARD}
  color: ${(props) => props.theme.colors.tertiary};

  &:after {
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const AboutContent = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.colors.tertiary};
`;

export default function AboutPage() {
  return (
    <Wrapper>
      <AboutTitle>About Me</AboutTitle>
      <AboutContent>沒有自拍照的部落格就是好的部落格。</AboutContent>
    </Wrapper>
  );
}
