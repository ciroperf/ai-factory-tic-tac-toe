// Logica pura del gioco: stato del tabellone, mosse, verifica vittoria/pareggio.
// Nessun accesso al DOM in questo file.

const BOARD_SIZE = 9;

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Crea una griglia 3x3 vuota, rappresentata come array piatto di 9 celle.
export function createBoard() {
  return new Array(BOARD_SIZE).fill(null);
}

// Ritorna una nuova board con la mossa applicata, senza mutare l'originale.
// Lancia un errore se la cella e' gia' occupata.
export function makeMove(board, index, player) {
  if (board[index] !== null) {
    throw new Error(`Cella ${index} gia' occupata`);
  }

  const nextBoard = [...board];
  nextBoard[index] = player;
  return nextBoard;
}

// Ritorna 'X' o 'O' se c'e' un vincitore, 'draw' in caso di pareggio,
// altrimenti null se la partita e' ancora in corso.
export function checkWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every((cell) => cell !== null)) {
    return 'draw';
  }

  return null;
}
