document.querySelector('.questions').addEventListener('click',
  (e) => {
    if (e.target.classList.contains('question__topic')) {
      e.target.nextElementSibling.classList.toggle('question__answer-hidden');
      e.target.nextElementSibling.classList.toggle('question__answer');
    }
  });
