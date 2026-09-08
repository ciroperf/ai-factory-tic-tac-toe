// Logica della CPU: sceglie la prossima mossa dato lo stato del tabellone.

// Ritorna l'indice di una cella libera scelta casualmente tra quelle
// disponibili. Non modifica la board ricevuta come argomento.
export function getCpuMove(board) {
  const freeCells = board.reduce((indexes, cell, index) => {
    if (cell === null) {
      indexes.push(index);
    }
    return indexes;
  }, []);

  const randomIndex = Math.floor(Math.random() * freeCells.length);
  return freeCells[randomIndex];
}
