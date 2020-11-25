import styled from "styled-components";

const AboutWrapper = styled.form`
  max-width: 480px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.primaryLight};
`;

const AboutTitle = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primaryLight};
  text-align: center;
  color: ${(props) => props.theme.colors.primaryDark};
  font-size: ${(props) => props.theme.fontSize.fontTitle};
  font-style: italic;
`;

const AboutContent = styled.div`
  margin-top: 24px;
  padding: 0 20px;
  text-align: justify;
`;

export default function AboutPage() {
  return (
    <AboutWrapper>
      <AboutTitle>about me</AboutTitle>
      <AboutContent>
        這個部落格充滿了大家拿來練習用的文章，但是不會看到大量的自拍照的部落格就是好的部落格。
      </AboutContent>
    </AboutWrapper>
  );
}
