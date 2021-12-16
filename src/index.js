import './style.css';

const tableBody = document.querySelector('tbody');
const requestURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/XlbFBk8CtDvgI6FEd2iz/scores/';

const scoreElement = (name, score) => {
  const tableRow = document.createElement('tr');
  const tableData = document.createElement('td');

  tableData.innerHTML = `${name}: ${score} `;

  tableRow.appendChild(tableData);
  tableBody.appendChild(tableRow);
};
const getScores = async () => {
  const data = await fetch(requestURL);
  const response = await data.json();
  const scores = await response.result;
  return scores;
};

const addScores = async (user, score) => {
  fetch(requestURL, {
    method: 'POST',
    body: JSON.stringify({ user, score }),
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
  });
};
const inputForm = document.querySelector('.addItem');
inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const getName = document.querySelector('#yourName').value;
  const getScore = document.querySelector('#yourScore').value;
  addScores(getName, getScore);
  inputForm.reset();
});

const displayAllScores = async () => {
  const allScores = await getScores();
  allScores.forEach((score) => scoreElement(score.user, score.score));
};

const refreshBtn = document.querySelector('.refresh');
refreshBtn.addEventListener('click', displayAllScores);
displayAllScores();