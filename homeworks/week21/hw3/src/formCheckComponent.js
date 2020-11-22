import styled from 'styled-components';

const CheckComponent = styled.div`
  margin-top: 52px;

  & div {
    margin-top: 24px;
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

const Reminder = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`

export default function FormCheckComponent ({ formData, handleInputChange, isReminder, name, title }) {

  return (
    <CheckComponent>
    <FormQuestion isRequired={formData[name].isRequired}>{title}</FormQuestion>
    <div>
      <input
        name={name}
        type="radio"
        value="imagination"
        checked={formData[name].content === 'imagination'}
        onChange={(event) => handleInputChange(event)}
      />
      <label>躺在床上用想像力實作</label>
    </div>
    <div>
      <input
        name={name}
        type="radio"
        value="readyMade"
        checked={formData[name].content === 'readyMade'}
        onChange={(event) => handleInputChange(event)}
      />
      <label> 趴在地上滑手機找現成的</label>
    </div>
    { isReminder.length > 0 ? (formData[name].isRequired && formData[name].content === '' ? <Reminder>此欄不可為空</Reminder> : '') : '' }
  </CheckComponent>
  )
}