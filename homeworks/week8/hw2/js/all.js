const gameURL = 'https://api.twitch.tv/kraken/games/top';
const streamURL = 'https://api.twitch.tv/kraken/streams/';

// 會用到兩個 API，將拿 API 的動作包成一個 function
// 1. 最熱門的遊戲
function getGames(fn) {
  const request = new XMLHttpRequest();
  // 只要前五個熱門遊戲
  request.open('GET', `${gameURL}/?limit=5`, true);

  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'yoshvqznzi8j2ild4h8k8il4iultit');

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let data;
      try {
        data = JSON.parse(request.responseText);
      } catch (e) {
        console.log('error');
        return; // 有錯就不往下執行 return 跳開
      }
      // 如果資料沒問題，看要用什麼 callback function 去處理得到的資料
      fn(data);
    } else {
      console.log('error');
    }
  };

  request.send();
}

// 2. 指定遊戲前 20 名的直播
function getStreams(gameName, fn) {
  const request = new XMLHttpRequest();
  request.open('GET', `${streamURL}?game=${gameName}`, true);

  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'yoshvqznzi8j2ild4h8k8il4iultit');

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let list;
      try {
        list = JSON.parse(request.responseText);
      } catch (e) {
        console.log('error');
        return;
      }
      fn(gameName, list);
    } else {
      console.log('error');
    }
  };
  request.send();
}

// 加空卡的 function
function addEmptyDiv() {
  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('game__empty');
  document.querySelector('.section__games').appendChild(emptyDiv);
}

// render 前 20 名遊戲畫面
function renderList(gameName, list) {
  // 清空 section__games 下的畫面
  document.querySelector('.section__games').innerHTML = '';
  // 改變 title
  document.querySelector('.section__title').innerText = gameName;
  // 改變畫面
  for (let i = 0; i < 20; i += 1) {
    const info = {
      logo: list.streams[i].channel.logo,
      name: list.streams[i].channel.display_name,
      status: list.streams[i].channel.status,
      preview: list.streams[i].preview.medium,
    };
    const div = document.createElement('div');
    div.classList.add('game');
    div.innerHTML = `
      <div class="game__preview">
        <img src="${info.preview}" width="100%" height="100%">
      </div>
      <div class="game__info">
        <div class="game__logo">
          <img src="${info.logo}" width="100%" height="100%">
        </div>
        <div class="game__name">
          <p class="game__channel">${info.status}</p>
          <p class="game__username">${info.name}</p>
        </div>
      </div>
    `;
    document.querySelector('.section__games').appendChild(div);
  }
  // 排上空卡，讓不足 3 的排版向左對齊
  // 直接 appendChild() 多次是沒有效果的 => 重複呼叫 function
  addEmptyDiv();
  addEmptyDiv();
}

// 初始畫面
getGames((data) => {
  // 要把資料寫到 nav__option 上
  const navOption = document.querySelectorAll('.nav__option');
  for (let i = 0; i < navOption.length; i += 1) {
    const game = data.top[i].game.name;
    navOption[i].innerText = game;
  }
  // 拿熱門第一遊戲的前 20 名直播
  getStreams(data.top[0].game.name, renderList);
});

// 點按鈕換畫面
document.querySelector('.nav__top-five').addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__option')) {
    const gameName = e.target.innerText;
    getStreams(gameName, renderList);
  }
});
