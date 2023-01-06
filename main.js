const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Enter a cell:");

rl.on('line', (input) => {
  // Executed:
  // Seperate the input (i.e. 1 2) into 1 & 2
    // make gameboard(i)(j). status = revealed
    // if it is bomb- you lose, if not continue
  const parts = input.split(' ');

  gameBoard[parts[0]][parts[1]].status = 'revealed';
  showBoard(gameBoard);

  

  if (gameBoard[parts[0]][parts[1]].type == 'mine') {
    console.log("You Lose!");
    rl.close();
  }

  console.log("Enter a cell:");
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

// Determining the surrounding-value of each cell. 
for (let i = 0; i < gameBoard.length; i++) {
  for (let j = 0; j < gameBoard.length; j++) {
    if (gameBoard[i][j].type == 'land') {
      // Middle Section
      if (i >= 1 & i <= (boardSize - 2) & j >= 1 & j <= (boardSize - 2)) {
        calcSurrMidd(i, j, gameBoard);
      } else if (i == 0 && j == 0) { // All corners
        calcSurrTopLeft(i, j, gameBoard);
      } else if (i == 0 && j == (boardSize - 1)) {
        calcSurrTopRight(i, j, gameBoard);
      } else if (i == (boardSize - 1) && j == 0) {
        calcSurrBotLeft(i, j, gameBoard);
      } else if (i == (boardSize - 1) && j == (boardSize - 1)) {
        calcSurrBotRight(i, j, gameBoard);
      } else if (i == 0) {
        calcSurrTop(i, j, gameBoard);
      } else if (i == (boardSize - 1)) {
        calcSurrBot(i, j, gameBoard);
      } else if (j == 0) {
        calcSurrLeft(i, j, gameBoard);
      } else if (j == (boardSize - 1)) {
        calcSurrRight(i, j, gameBoard);
      } 
    }
  }
}

// Determine the surrounding # for every square
showBoard(gameBoard); 

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
  }
}

function checkSurr (i, j, gameBoard, surroundingNum) {
  if (gameBoard[i][j].type == 'mine') {
    surroundingNum++;
  }

  return surroundingNum;

}


function calcSurrMidd(i, j, gameBoard) {
  let surroundingNum = 0;
  surroundingNum = checkSurr(i-1, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i-1, j, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i-1, j+1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i, j+1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j+1, gameBoard, surroundingNum);
  gameBoard[i][j].surrounding = surroundingNum;
}

function calcSurrTopLeft(i, j, gameBoard) {
  let surroundingNum = 0;
  surroundingNum = checkSurr(i, j+1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j+1, gameBoard, surroundingNum);
  gameBoard[i][j].surrounding = surroundingNum;
}

function calcSurrTopRight(i, j, gameBoard) {
  let surroundingNum = 0;
  surroundingNum = checkSurr(i, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j, gameBoard, surroundingNum);
  gameBoard[i][j].surrounding = surroundingNum;
}

function calcSurrBotLeft(i, j, gameBoard) {
  let surroundingNum = 0;
  surroundingNum = checkSurr(i-1, j, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i-1, j+1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i, j+1, gameBoard, surroundingNum);
  gameBoard[i][j].surrounding = surroundingNum;
}

function calcSurrBotRight(i, j, gameBoard) {
  let surroundingNum = 0;
  surroundingNum = checkSurr(i-1, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i-1, j, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i, j-1, gameBoard, surroundingNum);
  gameBoard[i][j].surrounding = surroundingNum;
}

function calcSurrTop(i, j, gameBoard) {
  let surroundingNum = 0;
  surroundingNum = checkSurr(i, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i, j+1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j+1, gameBoard, surroundingNum);
  gameBoard[i][j].surrounding = surroundingNum;
}

function calcSurrBot(i, j, gameBoard) {
  let surroundingNum = 0;
  surroundingNum = checkSurr(i-1, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i-1, j, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i-1, j+1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i, j+1, gameBoard, surroundingNum);
  gameBoard[i][j].surrounding = surroundingNum;
}


function calcSurrLeft(i, j, gameBoard) {
  let surroundingNum = 0;
  surroundingNum = checkSurr(i-1, j, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i-1, j+1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i, j+1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j+1, gameBoard, surroundingNum);
  gameBoard[i][j].surrounding = surroundingNum;
}

function calcSurrRight(i, j, gameBoard) {
  let surroundingNum = 0;
  surroundingNum = checkSurr(i-1, j, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i-1, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j-1, gameBoard, surroundingNum);
  surroundingNum = checkSurr(i+1, j, gameBoard, surroundingNum);
  gameBoard[i][j].surrounding = surroundingNum;
}


