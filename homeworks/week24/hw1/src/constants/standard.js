// AboutPage 和 Form 都會用到
// 不確定可不可以這樣包
export const TITLE_STANDARD = `
  position: relative;
  margin-bottom: 20px;
  padding-bottom: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;

  &:after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0px;
    width: 160px;
    border-bottom: 1px solid black;
  }
`;

export const CUSTOM_INPUT_FOCUS = `
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 5px;
  width: 100%;
  border-radius: 5px;
  outline: none;

  &::placeholder {
    font-style: italic;
    color: gray;
  }
`;
