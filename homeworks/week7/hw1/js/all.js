const name = document.querySelector('#name');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const how = document.querySelector('#how');
const other = document.querySelector('#other');
const radio = document.querySelectorAll('input[name=types]');
// const imagination = document.querySelector('#imagination');
// const readyMake = document.querySelector('#readyMake');

function valification(option) {
  let ans = [];
  if (option.value.length < 1) {
    // 沒通過
    option.nextElementSibling.classList.remove('remind__off');
    option.nextElementSibling.classList.add('remind__on');
    return;
  }
  // 有通過
  option.nextElementSibling.classList.remove('remind__on');
  option.nextElementSibling.classList.add('remind__off');
  const question = option.previousElementSibling.innerText;
  ans = { question, answer: option.value };
  return ans;// eslint-disable-line consistent-return
}

document.querySelector('.form__submit').addEventListener('click',
  () => {
    const nameAns = valification(name);
    const emailAns = valification(email);
    const numberAns = valification(number);
    const howAns = valification(how);

    // radio 選項
    let sum = 0;
    let radioAns = null;
    for (let i = 0; i < radio.length; i += 1) {
      if (radio[i].checked) {
        const question = document.querySelector('#type').innerText;
        const answer = radio[i].closest('label').innerText;
        radioAns = { question, answer };
        sum += 1;
      }
    }

    const formRadio = document.querySelectorAll('.form__radio');
    if (sum < 1) {
      formRadio[formRadio.length - 1].nextElementSibling.classList.remove('remind__off');
      formRadio[formRadio.length - 1].nextElementSibling.classList.add('remind__on');
    } else {
      formRadio[formRadio.length - 1].nextElementSibling.classList.remove('remind__on');
      formRadio[formRadio.length - 1].nextElementSibling.classList.add('remind__off');
    }

    // Other 選項
    let otherAns = null;
    if (other.value) {
      const question = other.closest('label').children[0].innerText;
      otherAns = { question, answer: other.value };
    }

    function isValue(option) {
      let str = '';
      if (option) {
        str += `${option.question}： ${option.answer} \n`;
      }
      return str;
    }

    // 放填寫資料
    let alertMessege = '';
    alertMessege
    += isValue(nameAns) + isValue(emailAns)
      + isValue(numberAns) + isValue(radioAns)
      + isValue(howAns) + isValue(otherAns);
    if (document.querySelectorAll('.remind__on').length === 0) { // 要確認都有資料才會 alert
      alert(alertMessege);// eslint-disable-line no-alert
    }
  });
