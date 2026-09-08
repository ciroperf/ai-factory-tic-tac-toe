# ai-factory-tic-tac-toe

Tris giocabile nel browser, 1v1 locale o contro CPU. Progetto di vetrina.

Questo file viene letto a ogni run dell'agente. Tienilo sotto le 40 righe.

## Stack

- HTML, CSS, JavaScript vanilla (moduli ES nativi, nessun framework)
- Nessun database o storage
- Test: `node --test`
- Avvio locale: apri `index.html` nel browser (o `npx serve .`)

## Regole

1. Mai push su `main`. Branch, PR, stop.
2. Un compito, una PR. Niente refactor non richiesti.
3. Se il compito e' ambiguo: commenta la domanda sull'issue e fermati.
4. Leggi in modo mirato con Grep e Glob. Non aprire `node_modules`, `dist`,
   `build`, `.next`, `bin`, `obj`, `*.lock`.
5. Nessun segreto nel codice, nemmeno negli esempi.
6. Nessuna dipendenza nuova senza scriverne il motivo nella PR.

## Convenzioni

- Codice e identificatori in inglese, commenti in italiano.
- Commit in forma imperativa, una riga.
- Logica di gioco in `src/game.js`, CPU in `src/ai.js`, DOM/eventi in
  `src/app.js`. Nessuna logica di gioco dentro `app.js`.

## Fatto quando

Una PR e' pronta se: `node --test` passa, il README riflette le novita', e
un'immagine o un output di esempio mostra il risultato.
