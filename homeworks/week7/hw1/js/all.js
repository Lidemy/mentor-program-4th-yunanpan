/* eslint-disable no-alert */
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  let hasError = false; // 用於判斷是否 required 的表格都有填寫
  const alertMessage = []; // 裝問題與回答

  // 先處理 input=text
  const inputs = document.querySelectorAll('.required input[type=text]');

  const answerText = function (input) {
    if (input.value.trim().length === 0) { // 有輸入值且不能是空白
      input.parentNode.classList.remove('hide');
      hasError = true;
    } else {
      input.parentNode.classList.add('hide');
      const question = input.parentNode.querySelector('label').innerText;
      alertMessage.push({ question, answer: input.value });
    }
  };
  inputs.forEach(input => answerText(input));

  // radio 的情況
  const radiosCheck = document.querySelector('.required input[type=radio]:checked');
  const radios = document.querySelector('.required input[type=radio]');
  if (radiosCheck) {
    radios.parentNode.parentNode.classList.add('hide');
    const question = radios.parentNode.parentNode.querySelector('div').innerText;
    const answer = radiosCheck.parentNode.innerText;
    alertMessage.push({ question, answer });
    // alertMessage[question] = answer
  } else {
    radios.parentNode.parentNode.classList.remove('hide');
    hasError = true;
  }

  // 把問題和回答改成一行行的格式
  let str = '';
  alertMessage.forEach((message) => {
    str += `${message.question}： ${message.answer} \n`;
  });

  if (!hasError) {
    alert(str);
  }
});
