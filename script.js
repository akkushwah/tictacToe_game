let cells = document.querySelectorAll('.cell');
let statusText = document.querySelector('#statusText');
let restartBtn = document.querySelector('#restartBtn');

let winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"
let running = false;



startGame()

function startGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `${currentPlayer} 's turn`;
  running = true;
}

function cellClicked() {
  let cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }
  else {
    updateCell(this, cellIndex);
    checkWinner();
  }
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  // console.log(options);
}

function changePlayer() {
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}


function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    let condition = winConditions[i];
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];


    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      let P1 = cells[condition[0]]
      let P2 = cells[condition[1]];
      let P3 = cells[condition[2]];
      P1.style.backgroundColor = "red";
      P2.style.backgroundColor = "red";
      P3.style.backgroundColor = "red";
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    statusText.style.color = "green";
    statusText.style.fontSize = "3rem";
    running = false;
  }
  else if (!options.includes("")) {
    statusText.textContent = `it's a Draw!`;
  }
  else {
    changePlayer();
  }
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "transparent";
  }
  );
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer} 's turn`;
  running = true;
  statusText.style.color = "black";
  statusText.style.fontSize = "25px";
}

