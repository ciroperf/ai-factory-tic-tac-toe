// Collegamento tra DOM ed eventi utente e la logica in game.js / ai.js.

import { createBoard, makeMove, checkWinner } from './game.js';
import { getCpuMove } from './ai.js';

const app = document.getElementById('app');

let mode = null; // null finche' non scelta: 'local' oppure 'cpu'
let board = createBoard();
let currentPlayer = 'X';
let winner = null;

// Costruisce il markup: scelta modalita' se non ancora selezionata,
// altrimenti tabellone e stato partita.
function render() {
  app.innerHTML = '';

  if (mode === null) {
    renderModeSelection();
    return;
  }

  const status = document.createElement('p');
  status.className = winner !== null ? 'status status--over' : 'status';
  status.textContent = statusText();
  app.appendChild(status);

  const grid = document.createElement('div');
  grid.className = 'board';

  board.forEach((cell, index) => {
    const button = document.createElement('button');
    button.className = 'cell';
    button.type = 'button';
    button.textContent = cell ?? '';
    button.disabled = cell !== null || winner !== null || isCpuTurn();
    button.addEventListener('click', () => handleCellClick(index));
    grid.appendChild(button);
  });

  app.appendChild(grid);

  const resetButton = document.createElement('button');
  resetButton.className = 'reset';
  resetButton.type = 'button';
  resetButton.textContent = 'Nuova partita';
  resetButton.addEventListener('click', handleReset);
  app.appendChild(resetButton);
}

// Mostra i due pulsanti per scegliere la modalita' di gioco.
function renderModeSelection() {
  const heading = document.createElement('p');
  heading.className = 'status';
  heading.textContent = 'Scegli la modalita\'';
  app.appendChild(heading);

  const modeSelection = document.createElement('div');
  modeSelection.className = 'mode-selection';

  const localButton = document.createElement('button');
  localButton.className = 'mode-button';
  localButton.type = 'button';
  localButton.textContent = '1v1 locale';
  localButton.addEventListener('click', () => handleModeSelect('local'));
  modeSelection.appendChild(localButton);

  const cpuButton = document.createElement('button');
  cpuButton.className = 'mode-button';
  cpuButton.type = 'button';
  cpuButton.textContent = 'Contro CPU';
  cpuButton.addEventListener('click', () => handleModeSelect('cpu'));
  modeSelection.appendChild(cpuButton);

  app.appendChild(modeSelection);
}

// Vero quando tocca alla CPU (O) e la partita e' ancora in corso.
function isCpuTurn() {
  return mode === 'cpu' && currentPlayer === 'O' && winner === null;
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

// Imposta la modalita' scelta e avvia una partita nuova.
function handleModeSelect(selectedMode) {
  mode = selectedMode;
  board = createBoard();
  currentPlayer = 'X';
  winner = null;

  render();
}

// Applica la mossa del giocatore di turno sulla cella cliccata, se libera.
function handleCellClick(index) {
  if (winner !== null || board[index] !== null || isCpuTurn()) {
    return;
  }

  applyMove(index);

  if (isCpuTurn()) {
    playCpuMove();
  }
}

// Applica una mossa alla board, aggiorna vincitore e turno, poi ridisegna.
function applyMove(index) {
  board = makeMove(board, index, currentPlayer);
  winner = checkWinner(board);
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  render();
}

// Chiede alla CPU la prossima mossa e la applica al posto di O.
function playCpuMove() {
  const cpuIndex = getCpuMove(board);
  applyMove(cpuIndex);
}

// Riporta board e turno allo stato iniziale mantenendo la modalita' scelta.
function handleReset() {
  board = createBoard();
  currentPlayer = 'X';
  winner = null;

  render();
}

render();
