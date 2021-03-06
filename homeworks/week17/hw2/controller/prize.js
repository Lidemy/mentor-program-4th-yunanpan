const db = require('../models')
const Prize = db.Prize

const prize = {
  index: (req, res) => {
    res.render('prize')
  },

  getPrize: (req, res) => {
    // 拿 db 裡的 id 和 機率（之後對照 id 拿其他資訊）
    Prize.findAll().then(prizes => {
      let arr = []
      let idArr = []
      prizes.forEach(prize => {
        arr.push(prize.probability)
        idArr.push(prize.id)
      })
      // console.log('機率', arr)
      // console.log('id', idArr)
      const id = idArr[calProbability(arr)]
      // console.log('result', result)
      Prize.findOne({
        where: {
          id
        }
      }).then(prize => {
        res.json({
          prize
        })
      })
    })
  }
}

// 算機率: https://riptutorial.com/javascript/example/10972/simulating-events-with-different-probabilities
function calProbability(chances) { // 傳進來的會是陣列
  let sum = 0 // chances 的總和，未來當分母算機率
  chances.forEach(chance => {
    sum += Number(chance)
  })
  const rand = Math.random()
  let chance = 0
  for(var i = 0; i < chances.length; i += 1) {
      chance += chances[i] / sum
      if (rand < chance) {
          return i
      }
  }
  return -1
}

module.exports = prize