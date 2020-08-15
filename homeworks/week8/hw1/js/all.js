const urlAPI = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errMessage = '系統不穩定，請再試一次';

// 拿得到的文字和圖片渲染畫面
function renderResult(str, imgSrc) {
  const container = document.querySelector('.prize');
  // 把原畫面隱藏
  container.querySelector('.prize__wrap').classList.add('hide');
  // 背景圖片更換
  container.classList.add(`prize__${imgSrc.toLowerCase()}`);
  // 把文字加到畫面上
  const div = document.createElement('div');
  div.classList.add('prize__result');
  div.innerHTML = `
    <h1 class="prize__result-title">${str}</h1>
    <div class="prize__btn" onclick="javascript: window.location.reload()">
      我要抽獎
    </div>
  `;
  container.appendChild(div);
}

// 得到的結果與對應的文字和圖片
function getResult(result) {
  console.log('getResult');
  switch (result) {
    case 'FIRST':
      renderResult('恭喜你中頭獎了！日本東京來回雙人遊！', result);
      break;
    case 'SECOND':
      renderResult('二獎！90 吋電視一台！', result);
      break;
    case 'THIRD':
      renderResult('恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！', result);
      break;
    case 'NONE':
      renderResult('銘謝惠顧', result);
      break;
    default:
      alert(errMessage);
  }
}

// 拿 API
function getPrize(fn) {
  const request = new XMLHttpRequest();
  request.open('GET', urlAPI, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let result;
      try {
        result = JSON.parse(request.responseText).prize;
      } catch (e) {
        alert(errMessage);
        return;
      }
      fn(result);
    } else {
      alert(errMessage);
    }
  };
  request.send();
}

// 點 button 監聽事件
document.querySelector('.prize__btn').addEventListener('click', () => {
  getPrize(getResult);
});
