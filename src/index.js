import './style.css';

const tableBody = document.querySelector('tbody');
const requestURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/XlbFBk8CtDvgI6FEd2iz/scores/';
function scoreElement(name, score) {
  const tableRow = document.createElement('tr');
  const tableData = document.createElement('td');

  tableData.innerHTML = `${name}: ${score} `;

  tableRow.appendChild(tableData);
  tableBody.appendChild(tableRow);
}
async function getScores() {
  // Get scores data

  const data = await fetch(requestURL);

  // convert scores data to object/array
  const response = await data.json();

  // find scores array
  const scores = await response.result;
  return scores;
}
async function addScores(user, score) {
  fetch(requestURL, {
    method: 'POST',
    body: JSON.stringify({ user, score }),
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
  });
}
const inputForm = document.querySelector('.addItem');
inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const getName = document.querySelector('#yourName').value;
  const getScore = document.querySelector('#yourScore').value;
  addScores(getName, getScore);
  inputForm.reset();
});
async function displayAllScores() {
  const allScores = await getScores();
  allScores.forEach((score) => scoreElement(score.user, score.score));
}
const refreshBtn = document.querySelector('.refresh');
refreshBtn.addEventListener('click', displayAllScores);
displayAllScores();