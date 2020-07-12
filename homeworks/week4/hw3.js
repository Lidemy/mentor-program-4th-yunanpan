const request = require('request');

request(
  `https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
  (error, response, body) => {
    const countries = JSON.parse(body);
    if (countries.status !== 404) {
      for (let i = 0; i < countries.length; i += 1) {
        console.log('============');
        console.log(`國家：${countries[i].name}`);
        console.log(`首都：${countries[i].capital}`);
        console.log(`貨幣：${countries[i].currencies[0].code}`);
        console.log(`國碼：${countries[i].callingCodes[0]}`);
      }
    } else {
      console.log('找不到國家資訊');
    }
  },
);
