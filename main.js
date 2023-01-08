
printInstructions();
const boardSize = 16;

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



let cell = {
  surroundNum: 0
}

// Determine's the num of surrounding bombs for each cell. 
for (let i = 0; i < gameBoard.length; i++) {
  for (let j = 0; j < gameBoard.length; j++) {
    if (gameBoard[i][j].type == 'land') {
      calcSurrNum(gameBoard, i, j);
      gameBoard[i][j].surrounding = cell.surroundNum;
      cell.surroundNum = 0;
    }
  }
}

// Question's user and transforms typed input into a 'move' on the game board. 
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

showBoard(gameBoard);
process.stdout.write("Enter a cell: ");

rl.on('line', (input) => {
  const parts = input.split(' ');
  // Transforms i & j (which are considered strings) into integers, enabling arithmetic to be applied appropriately. 
  let i = parseInt(parts[0]);
  let j = parseInt(parts[1]);

  if (isNaN(i) == true || isNaN(j) == true) {
    console.log('Please enter a valid input');
    process.stdout.write("Enter a cell: ");
  } else if (gameBoard[i][j].type == 'mine') {
    console.log("You Lose!");
    rl.close();
  } else {
    gameBoard[i][j].status = 'revealed';
    updateBoard(gameBoard, i, j);
    showBoard(gameBoard);
    process.stdout.write("Enter a cell: ");
  }
});

/* 
current issue: an invalid input like a, c, a c, or enter will mess it up. 
*/

// For a given cell, it calculates the surrounding property by exploring the type of neighbouring cells. 
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

// A helper function to calcSurrNum(), where if the supplied cell has a type of 'mine', iterates a counter by a unit. 
function checkSurr (gameBoard, i, j) {
  if (gameBoard[i][j].type == 'mine') {
    cell.surroundNum++;
  }
  
}

// Displays the 2D-array in a board-like structure
function showBoard (gameBoard) {

  let borderStr = '-';
  let numStr = '';
  for (let i = 0; i < gameBoard.length; i++) {
    if (i < 10) {
      numStr += `  ${i} `;
    } else {
      numStr += ` ${i} `;
    }
     
    borderStr += `----`;
  }
  console.log(numStr);
  console.log(borderStr);
  // Here, we add the numbers onto 'rowString' which is then printed on console.
  // Without this, there would be newline's between every cell. 
  for (let i = 0; i < gameBoard.length; i++) {
    let rowString = ``;
    for (let j = 0; j < gameBoard.length; j++) {
      if (gameBoard[i][j].status != 'hidden') {
        rowString += ` ${gameBoard[i][j].surrounding} |`;
      } else {
        rowString += `   |`;
      }
      

    }
    process.stdout.write('|')
    rowString += `  ${i}`;
    console.log(rowString);
    console.log(borderStr);
  }
}

// Returns a random integer between (and including) the given min & max.
function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Places mines
function placeMines(gameBoard) {
  const numBombs = Math.round((1/4.85)*(boardSize * boardSize));

  for (let i = 0; i < numBombs; i++) {
    const randomIntRow = getRandomInt(0, boardSize - 1);
    const randomIntCol = getRandomInt(0, boardSize - 1);
  
    if (gameBoard[randomIntRow][randomIntCol].type == 'mine') {
      i--;
    } 
  
    gameBoard[randomIntRow][randomIntCol].type = 'mine';
    gameBoard[randomIntRow][randomIntCol].surrounding = 'X';
    // gameBoard[randomIntRow][randomIntCol].status = 'revealed'
  }
}

function updateBoard(gameBoard, i, j) {
  
  // j = parseInt(j);
  // i = parseInt(i);

  // It-self
  checkForZeroNeighbour(gameBoard, i, j);
  // Top-Left
  if ((i - 1) >= 0 && (j - 1) >= 0) {
    checkForZeroNeighbour(gameBoard, i - 1, j - 1);
  }
  // Top-Middle
  if ((i - 1) >= 0 && j >= 0 && j < gameBoard.length) {
    checkForZeroNeighbour(gameBoard, i - 1, j);
  }
  // Top-Right
  if ((i - 1) >= 0 && (j + 1) < gameBoard.length) {
    checkForZeroNeighbour(gameBoard, i - 1, j + 1);
  }
  // Middle-Left
  if (i >= 0 && (j - 1) >= 0) {
    checkForZeroNeighbour(gameBoard, i, j - 1);
  }
  // Middle-Right
  if (i >= 0 && (j + 1) < gameBoard.length) {
    checkForZeroNeighbour(gameBoard, i, (j+1));
  }
  // Bottom-Left
  if ((i + 1) < gameBoard.length && (j - 1) >= 0) {
    checkForZeroNeighbour(gameBoard, i + 1, j - 1);
  }
  // Bottom-Middle
  if ((i + 1) < gameBoard.length && j >= 0) {
    checkForZeroNeighbour(gameBoard, i + 1, j);
  }
  // Bottom-Right
  if ((i + 1) < gameBoard.length && (j + 1) < gameBoard.length) {
    checkForZeroNeighbour(gameBoard, i + 1, j + 1);
  }
}

function checkForZeroNeighbour(gameBoard, i, j) {
  if (gameBoard[i][j].surrounding == 0 && gameBoard[i][j].status == 'hidden') {
    gameBoard[i][j].status = 'revealed';
    revealAllSurr(gameBoard, i, j); 
  }

  return;
}

function revealAllSurr(gameBoard, i, j) {
  // j = parseInt(j);
  // i = parseInt(i);

  // Top-Left
  if ((i - 1) >= 0 && (j - 1) >= 0) {
    if (gameBoard[(i-1)][(j-1)].surrounding == 0 && gameBoard[(i-1)][(j-1)].status == 'hidden') {
      gameBoard[(i-1)][(j-1)].status = 'revealed';
      revealAllSurr(gameBoard, (i-1), (j-1));
    } else {
      gameBoard[(i-1)][(j-1)].status = 'revealed';
    }
  }
  // Top-Middle
  if ((i - 1) >= 0 && j >= 0 && j < gameBoard.length && gameBoard[(i-1)][(j)].status == 'hidden') {
    if (gameBoard[(i-1)][(j)].surrounding == 0) {
      gameBoard[(i-1)][(j)].status = 'revealed';
      revealAllSurr(gameBoard, (i-1), (j));
    } else {
      gameBoard[(i-1)][(j)].status = 'revealed';
    }
  }
  // Top-Right
  if ((i - 1) >= 0 && (j + 1) < gameBoard.length) {
    if (gameBoard[(i-1)][(j+1)].surrounding == 0 && gameBoard[(i-1)][(j+1)].status == 'hidden') {
      gameBoard[(i-1)][(j+1)].status = 'revealed';
      revealAllSurr(gameBoard, (i-1), (j+1));
    } else {
      gameBoard[(i-1)][(j+1)].status = 'revealed';
    }
  }
  // Middle-Left
  if (i >= 0 && (j - 1) >= 0) {
    if (gameBoard[(i)][(j-1)].surrounding == 0 && gameBoard[(i)][(j-1)].status == 'hidden') {
      gameBoard[(i)][(j-1)].status = 'revealed';
      revealAllSurr(gameBoard, (i), (j-1));
    } else {
      gameBoard[(i)][(j-1)].status = 'revealed';
    }
  }
  // Middle-Right
  if (i >= 0 && (j + 1) < gameBoard.length) {
    if (gameBoard[(i)][(j+1)].surrounding == 0 && gameBoard[(i)][(j+1)].status == 'hidden') {
      gameBoard[(i)][(j+1)].status = 'revealed';
      revealAllSurr(gameBoard, (i), (j+1));
    } else {
      gameBoard[(i)][(j+1)].status = 'revealed';
    }
  }
  // Bottom-Left
  if ((i + 1) < gameBoard.length && (j - 1) >= 0) {
    if (gameBoard[(i+1)][(j-1)].surrounding == 0 && gameBoard[(i+1)][(j-1)].status == 'hidden') {
      gameBoard[(i+1)][(j-1)].status = 'revealed';
      revealAllSurr(gameBoard, (i+1), (j-1));
    } else {
      gameBoard[(i+1)][(j-1)].status = 'revealed';
    }
  }
  // Bottom-Middle
  if ((i + 1) < gameBoard.length && j >= 0) {
    if (gameBoard[(i+1)][(j)].surrounding == 0 && gameBoard[(i+1)][(j)].status == 'hidden') {
      gameBoard[(i+1)][(j)].status = 'revealed';
      revealAllSurr(gameBoard, (i+1), (j));
    } else {
      gameBoard[(i+1)][(j)].status = 'revealed';
    }
  }
  // Bottom-Right
  if ((i + 1) < gameBoard.length && (j + 1) < gameBoard.length) {
    if (gameBoard[(i+1)][(j+1)].surrounding == 0 && gameBoard[(i+1)][(j+1)].status == 'hidden') {
      gameBoard[(i+1)][(j+1)].status = 'revealed';
      revealAllSurr(gameBoard, (i+1), (j+1));
    } else {
      gameBoard[(i+1)][(j+1)].status = 'revealed';
    }
  }
}

function printInstructions() {
  console.log("This is a simple game of Minesweeper on the console.");
  console.log("When prompted, please enter a cell in the format 'Row' 'Col'. That is, to reveal the cell at (1,5) simply type 1 5.");
  console.log("The game will end either when a bomb is revealed in which case the player loses or if the number of remaining cells are equivalent to the number of bombs in which case the player wins.");
  console.log("Have fun!");
}