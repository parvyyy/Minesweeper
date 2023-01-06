const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.stdout.write("Enter a cell: ");

rl.on('line', (input) => {
  // Executed:
  // Seperate the input (i.e. 1 2) into 1 & 2
    // make gameboard(i)(j). status = revealed
    // if it is bomb- you lose, if not continue
  const parts = input.split(' ');

  gameBoard[parts[0]][parts[1]].status = 'revealed';
  updateBoard(parts[0], parts[1]);
  showBoard(gameBoard);

  if (gameBoard[parts[0]][parts[1]].type == 'mine') {
    console.log("You Lose!");
    rl.close();
  }

  process.stdout.write("Enter a cell: ");
});

const boardSize = 8;

// Creating the board
let gameBoard = new Array(boardSize);
for (let i = 0; i < gameBoard.length; i++) {
  gameBoard[i] = new Array(boardSize);
}

// Filling the board out with values
for (let i = 0; i < gameBoard.length; i++) {
  for (let j = 0; j < gameBoard.length; j++) {
    gameBoard[i][j] = {
      type: 'land', // BOMB or NORMAL
      surrounding: 'X', // To display the #
      status: 'hidden' // REVEALED or HIDDEN
    }
  }
}
// Placing the bomb's randomly
placeMines(gameBoard);

showBoard(gameBoard);

let cell = {
  surroundNum: 0
}

for (let i = 0; i < gameBoard.length; i++) {
  for (let j = 0; j < gameBoard.length; j++) {
    if (gameBoard[i][j].type == 'land') {
      
      calcSurrNum(gameBoard, i, j);
      gameBoard[i][j].surrounding = cell.surroundNum;
      
      cell.surroundNum = 0;
      gameBoard[i][j].status = 'revealed';

    }
  }
}

showBoard(gameBoard);

function calcSurrNum(gameBoard, i, j) {
  // Top-Left
  if ((i - 1) >= 0 && (j - 1) >= 0) {
    checkSurr(gameBoard, i - 1, j - 1);
  }
  // Top-Middle
  if ((i - 1) >= 0 && j >= 0 && j < gameBoard.length) {
    checkSurr(gameBoard, i - 1, j);
  }
  // Top-Right
  if ((i - 1) >= 0 && (j + 1) < gameBoard.length) {
    checkSurr(gameBoard, i - 1, j + 1);
  }
  // Middle-Left
  if (i >= 0 && (j - 1) >= 0) {
    checkSurr(gameBoard, i, j - 1);
  }
  // Middle-Right
  if (i >= 0 && (j + 1) < gameBoard.length) {
    checkSurr(gameBoard, i, (j+1));
  }
  // Bottom-Left
  if ((i + 1) < gameBoard.length && (j - 1) >= 0) {
    checkSurr(gameBoard, i + 1, j - 1);
  }
  // Bottom-Middle
  if ((i + 1) < gameBoard.length && j >= 0) {
    checkSurr(gameBoard, i + 1, j);
  }
  // Bottom-Right
  if ((i + 1) < gameBoard.length && (j + 1) < gameBoard.length) {
    checkSurr(gameBoard, i + 1, j + 1);
  }
}

function checkSurr (gameBoard, i, j) {
  if (gameBoard[i][j].type == 'mine') {
    cell.surroundNum++;
  }
  
}

function showBoard (gameBoard) {
  console.log('---------------------------------');
  // Here, we add the numbers onto 'rowString' which is then printed on console.
  // Without this, there would be newline's between every cell. 
  for (let i = 0; i < gameBoard.length; i++) {
    let rowString = ''
    for (let j = 0; j < gameBoard.length; j++) {
      if (gameBoard[i][j].status != 'hidden') {
        rowString += ` ${gameBoard[i][j].surrounding} |`;
      } else {
        rowString += `   |`;
      }
      

    }
    process.stdout.write('|')
    console.log(rowString);
    console.log('---------------------------------');
  }
}

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function placeMines(gameBoard) {
  const numBombs = 12;

  for (let i = 0; i < numBombs; i++) {
    const randomIntRow = getRandomInt(0, boardSize - 1);
    const randomIntCol = getRandomInt(0, boardSize - 1);
  
    if (gameBoard[randomIntRow][randomIntCol].type == 'mine') {
      i--;
    } 
  
    gameBoard[randomIntRow][randomIntCol].type = 'mine';
    gameBoard[randomIntRow][randomIntCol].surrounding = 'X';
    gameBoard[randomIntRow][randomIntCol].surrounding = 'revealed'
  }
}

function updateBoard(i, j) {



}