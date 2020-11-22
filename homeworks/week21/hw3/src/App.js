import { useState, useEffect } from "react";
import styled from "styled-components";
import FormAlertWrapper from "./formAlert";
import FormInputComponent from "./formInputComponent";
import FormCheckComponent from "./formCheckComponent";

const Wrapper = styled.div`
  margin: 128px auto;
  padding: 54px 40px;
  border-top: 8px solid #fad312;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  width: 645px;
`;

const FormTitle = styled.div`
  margin-bottom: 36px;
  font-family: MicrosoftJhengHei;
  font-size: 36px;
  font-weight: bold;
`;

const FormDescription = styled.div`
  line-height: 25px;
  font-family: MicrosoftJhengHei;
  font-size: 14px;
`;
const FormSubmitButton = styled.input`
  margin-top: 56px;
  margin-bottom: 20px;
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

function Form({ formData, handleInputChange, handleSubmitForm, isReminder }) {
  return (
    <form onSubmit={(event) => handleSubmitForm(event, formData)}>
      <FormInputComponent
        formData={formData}
        handleInputChange={handleInputChange}
        isReminder={isReminder}
        name="nickname"
        title="暱稱"
      />
      <FormInputComponent
        formData={formData}
        handleInputChange={handleInputChange}
        isReminder={isReminder}
        name="email"
        title="電子郵件"
      />
      <FormInputComponent
        formData={formData}
        handleInputChange={handleInputChange}
        isReminder={isReminder}
        name="phone"
        title="手機號碼"
      />
      <FormCheckComponent
        formData={formData}
        handleInputChange={handleInputChange}
        isReminder={isReminder}
        name="signUpType"
        title="報名類型"
      />
      <FormInputComponent
        formData={formData}
        handleInputChange={handleInputChange}
        isReminder={isReminder}
        name="how"
        title="如何知道活動？"
      />
      <FormInputComponent
        formData={formData}
        handleInputChange={handleInputChange}
        isReminder={isReminder}
        name="other"
        title="其他"
      />
      <FormSubmitButton type="submit" value="提交" />
      <FormDescription>請勿透過表單送出您的密碼。</FormDescription>
    </form>
  );
}

function App() {
  const [formData, setFormData] = useState({
    nickname: {
      id: "nickname",
      content: "",
      isRequired: true,
    },
    email: {
      content: "",
      isRequired: true,
    },
    phone: {
      content: "",
      isRequired: true,
    },
    signUpType: {
      content: "",
      isRequired: true,
    },
    how: {
      content: "",
      isRequired: true,
    },
    other: {
      content: "",
      isRequired: false,
    },
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [isReminder, setIsReminder] = useState([]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        content: value,
      },
    });
  };

  const handleSubmitForm = (event) => {
    let reminder = [];
    let lists = ["nickname", "email", "phone", "how", "signUpType"];
    lists.forEach((list) => {
      if (formData[list].isRequired && formData[list].content === "") {
        reminder.push(list);
      }
    });

    if (reminder.length !== 0) {
      setIsReminder(reminder);
    } else {
      setIsReminder([]);
      setIsSubmit(true);
    }
    event.preventDefault();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isSubmit, isReminder]);

  const handleDismiss = () => {
    setFormData({
      nickname: {
        ...formData.nickname,
        content: "",
      },
      email: {
        ...formData.email,
        content: "",
      },
      phone: {
        ...formData.phone,
        content: "",
      },
      signUpType: {
        ...formData.signUpType,
        content: "",
      },
      how: {
        ...formData.how,
        content: "",
      },
      other: {
        ...formData.other,
        content: "",
      },
    });
    return setIsSubmit(false);
  };

  return (
    <Wrapper>
      <FormTitle>新拖延運動報名表單</FormTitle>
      <FormDescription>活動日期：2020/12/10 ~ 2020/12/11</FormDescription>
      <FormDescription>活動地點：台北市大安區新生南路二段1號</FormDescription>
      <Form
        isReminder={isReminder}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmitForm={handleSubmitForm}
      />
      {isSubmit ? (
        <FormAlertWrapper formData={formData} handleDismiss={handleDismiss} />
      ) : (
        ""
      )}
    </Wrapper>
  );
}

export default App;

// 參考： https://medium.com/@daniela.sandoval/creating-a-popup-window-using-js-and-react-4c4bd125da57
