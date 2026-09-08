// Test della CPU con node:test.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createBoard, makeMove } from '../src/game.js';
import { getCpuMove } from '../src/ai.js';

test('getCpuMove ritorna sempre una cella libera su board vuota', () => {
  const board = createBoard();
  for (let i = 0; i < 50; i++) {
    const move = getCpuMove(board);
    assert.ok(move >= 0 && move < 9);
    assert.equal(board[move], null);
  }
});

test('getCpuMove ritorna sempre una cella libera su board quasi piena', () => {
  let board = createBoard();
  const moves = [
    [0, 'X'], [1, 'O'], [2, 'X'],
    [3, 'O'], [4, 'X'], [5, 'O'],
    [6, 'X'], [7, 'O'],
  ];
  for (const [index, player] of moves) {
    board = makeMove(board, index, player);
  }

  for (let i = 0; i < 20; i++) {
    const move = getCpuMove(board);
    assert.equal(move, 8);
  }
});

test('getCpuMove non modifica la board ricevuta', () => {
  const board = createBoard();
  const copy = [...board];
  getCpuMove(board);
  assert.deepEqual(board, copy);
});
