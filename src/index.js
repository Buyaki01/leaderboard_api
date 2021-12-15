import './style.css';
import scores from './scoresList.js';

const tableBody = document.querySelector('tbody');
function scoreElement(name, score) {
  const tableRow = document.createElement('tr');
  const tableData = document.createElement('td');

  tableData.innerHTML = `${name}: ${score} `;

  tableRow.appendChild(tableData);
  tableBody.appendChild(tableRow);
}
scores.forEach((score) => scoreElement(score.user, score.score));
