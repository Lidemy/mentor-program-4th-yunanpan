const request = require('request');

// HTTP Authentication
request(
  {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers:
      {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'yoshvqznzi8j2ild4h8k8il4iultit',
      },
  },
  (error, response, body) => {
    // 把拿到的資料轉成 object 格式
    const info = JSON.parse(body);

    // 依序輸出觀看數及遊戲名稱
    for (let i = 0; i < info.top.length; i += 1) {
      const name = info.top[i];
      console.log(`${name.viewers} ${name.game.name}`);
    }
  },
);
