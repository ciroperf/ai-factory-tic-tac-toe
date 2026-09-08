// Test della logica di gioco con node:test. Da popolare nei compiti dedicati.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createBoard, makeMove, checkWinner } from '../src/game.js';

test('createBoard crea una griglia 3x3 vuota', () => {
  const board = createBoard();
  assert.equal(board.length, 9);
  assert.ok(board.every((cell) => cell === null));
});

test('makeMove ritorna una nuova board senza mutare l\'originale', () => {
  const board = createBoard();
  const nextBoard = makeMove(board, 0, 'X');

  assert.equal(nextBoard[0], 'X');
  assert.equal(board[0], null);
  assert.notEqual(nextBoard, board);
});

test('makeMove segnala mossa non valida su cella occupata', () => {
  const board = makeMove(createBoard(), 0, 'X');
  assert.throws(() => makeMove(board, 0, 'O'));
});

test('checkWinner rileva la vittoria in riga', () => {
  let board = createBoard();
  board = makeMove(board, 0, 'X');
  board = makeMove(board, 1, 'X');
  board = makeMove(board, 2, 'X');

  assert.equal(checkWinner(board), 'X');
});

test('checkWinner rileva la vittoria in colonna', () => {
  let board = createBoard();
  board = makeMove(board, 0, 'O');
  board = makeMove(board, 3, 'O');
  board = makeMove(board, 6, 'O');

  assert.equal(checkWinner(board), 'O');
});

test('checkWinner rileva la vittoria in diagonale', () => {
  let board = createBoard();
  board = makeMove(board, 0, 'X');
  board = makeMove(board, 4, 'X');
  board = makeMove(board, 8, 'X');

  assert.equal(checkWinner(board), 'X');
});

test('checkWinner rileva il pareggio', () => {
  // X | O | X
  // X | O | O
  // O | X | X
  const moves = [
    [0, 'X'], [1, 'O'], [2, 'X'],
    [4, 'O'], [3, 'X'], [5, 'O'],
    [7, 'X'], [6, 'O'], [8, 'X'],
  ];

  let board = createBoard();
  for (const [index, player] of moves) {
    board = makeMove(board, index, player);
  }

  assert.equal(checkWinner(board), 'draw');
});

test('checkWinner ritorna null a partita in corso', () => {
  let board = createBoard();
  board = makeMove(board, 0, 'X');

  assert.equal(checkWinner(board), null);
});
