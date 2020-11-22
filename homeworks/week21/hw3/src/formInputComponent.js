import styled from 'styled-components';

const InputComponent = styled.div`
  margin-top: 52px;

  & input {
    margin-top: 20px;
    padding: 5px;
    border: solid 1px #d0d0d0;
    width: 287px;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }
`

const FormQuestion = styled.div`
  font-size: 20px;

  ${props => props.isRequired && `
    &:after {
      content: "*";
      margin-left: 10px;
      color: red;
    }
  `}
`

const FormDescription = styled.div`
  line-height: 25px;
  font-family: MicrosoftJhengHei;
  font-size: 14px;
`

const Reminder = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`

export default function FormInputComponent ({ formData, handleInputChange, isReminder, name, title }) {
  return (
    <InputComponent>
      <label>
        <FormQuestion isRequired={formData[name].isRequired}>{title}</FormQuestion>
        { name === 'other' ? <FormDescription>對活動的一些建議</FormDescription> : '' }
        <input
          name={name}
          type="text"
          value={formData[name].content}
          onChange={(event) => handleInputChange(event)}
          placeholder="您的回答" />
      </label>
      { isReminder.length > 0 ? (formData[name].isRequired && formData[name].content === '' ? <Reminder>此欄不可為空</Reminder> : '') : '' }
    </InputComponent>
  )
}
