// Collegamento tra DOM ed eventi utente e la logica in game.js / ai.js.

import { createBoard, makeMove, checkWinner } from './game.js';

const app = document.getElementById('app');

let board = createBoard();
let currentPlayer = 'X';
let winner = null;

// Costruisce il markup del tabellone e dello stato partita.
function render() {
  app.innerHTML = '';

  const status = document.createElement('p');
  status.className = 'status';
  status.textContent = statusText();
  app.appendChild(status);

  const grid = document.createElement('div');
  grid.className = 'board';

  board.forEach((cell, index) => {
    const button = document.createElement('button');
    button.className = 'cell';
    button.type = 'button';
    button.textContent = cell ?? '';
    button.disabled = cell !== null || winner !== null;
    button.addEventListener('click', () => handleCellClick(index));
    grid.appendChild(button);
  });

  app.appendChild(grid);
}

function statusText() {
  if (winner === 'draw') {
    return 'Pareggio!';
  }
  if (winner) {
    return `Vince ${winner}!`;
  }
  return `Turno di ${currentPlayer}`;
}

// Applica la mossa del giocatore di turno sulla cella cliccata, se libera.
function handleCellClick(index) {
  if (winner !== null || board[index] !== null) {
    return;
  }

  board = makeMove(board, index, currentPlayer);
  winner = checkWinner(board);
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  render();
}

render();
