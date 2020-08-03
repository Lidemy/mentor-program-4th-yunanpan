document.querySelector('.questions').addEventListener('click', (e) => {
  const element = e.target.closest('.question');
  if (element) {
    element.classList.toggle('question__answer-hidden');
  }
});

// 檢討前
// document.querySelector('.questions').addEventListener('click',
//   (e) => {
//     if (e.target.classList.contains('question__topic')) {
//       e.target.nextElementSibling.classList.toggle('question__answer-hidden');
//     }
//   });
