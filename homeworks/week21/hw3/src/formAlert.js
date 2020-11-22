import styled from "styled-components";

const FormTitle = styled.div`
  margin-bottom: 36px;
  font-family: MicrosoftJhengHei;
  font-size: 36px;
  font-weight: bold;
`;

const FormDismissButton = styled.button`
  padding: 12px 32px;
  border: none;
  border-radius: 3px;
  background-color: #fad312;
  font-size: 16px;

  &:focus,
  &:hover {
    outline: none;
  }

  &:hover {
    box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

const FormAlert = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  background-color: white;
  border: 1px solid black;
  font-size: 14px;
`;

const FormDescription = styled.div`
  line-height: 25px;
  font-family: MicrosoftJhengHei;
  font-size: 14px;
`;

export default function FormAlertWrapper({ formData, handleDismiss }) {
  return (
    <FormAlert>
      <FormTitle>您已成功填寫表單</FormTitle>
      <FormDescription>暱稱： {formData.nickname.content}</FormDescription>
      <FormDescription>電子郵件： {formData.email.content}</FormDescription>
      <FormDescription>手機號碼： {formData.phone.content}</FormDescription>
      <FormDescription>
        報名類型：{" "}
        {formData.signUpType.content !== ""
          ? formData.signUpType.content === "imagination"
            ? "躺在床上用想像力實作"
            : "趴在地上滑手機找現成的"
          : ""}
      </FormDescription>
      <FormDescription>如何知道活動： {formData.how.content}</FormDescription>
      <FormDescription>其他： {formData.other.content}</FormDescription>
      <FormDismissButton onClick={() => handleDismiss()}>
        關閉
      </FormDismissButton>
    </FormAlert>
  );
}
