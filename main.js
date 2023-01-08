const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.stdout.write("Enter a cell: ");

rl.on('line', (input) => {
  const parts = input.split(' ');

  gameBoard[parts[0]][parts[1]].status = 'revealed';
  updateBoard(gameBoard, parts[0], parts[1]);
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

let cell = {
  surroundNum: 0
}

for (let i = 0; i < gameBoard.length; i++) {
  for (let j = 0; j < gameBoard.length; j++) {
    if (gameBoard[i][j].type == 'land') {
      
      calcSurrNum(gameBoard, i, j);
      gameBoard[i][j].surrounding = cell.surroundNum;
      
      cell.surroundNum = 0;
      // gameBoard[i][j].status = 'revealed';

    }
  }
}

// showBoard(gameBoard);

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
  const numBombs = 10;

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
  j = parseInt(j);
  i = parseInt(i);

  console.log(`${i} & ${j}`);
  // Top-Left
  if ((i - 1) >= 0 && (j - 1) >= 0) {
    console.log(`Top Left: ${(i-1)} & ${(j-1)}`);
    checkForZeroNeighbour(gameBoard, i - 1, j - 1);
  }
  // Top-Middle
  if ((i - 1) >= 0 && j >= 0 && j < gameBoard.length) {
    console.log(`Top Middle: ${(i-1)} & ${j}`);
    checkForZeroNeighbour(gameBoard, i - 1, j);
  }
  // Top-Right
  if ((i - 1) >= 0 && (j + 1) < gameBoard.length) {
    console.log(`Top Right: ${(i-1)} & ${(j+1)}`);
    checkForZeroNeighbour(gameBoard, i - 1, j + 1);
  }
  // Middle-Left
  if (i >= 0 && (j - 1) >= 0) {
    console.log('e');
    checkForZeroNeighbour(gameBoard, i, j - 1);
  }
  // Middle-Right
  if (i >= 0 && (j + 1) < gameBoard.length) {
    console.log('f');
    checkForZeroNeighbour(gameBoard, i, (j+1));
  }
  // Bottom-Left
  if ((i + 1) < gameBoard.length && (j - 1) >= 0) {
    console.log('g');
    checkForZeroNeighbour(gameBoard, i + 1, j - 1);
  }
  // Bottom-Middle
  if ((i + 1) < gameBoard.length && j >= 0) {
    console.log('h');
    checkForZeroNeighbour(gameBoard, i + 1, j);
  }
  // Bottom-Right
  if ((i + 1) < gameBoard.length && (j + 1) < gameBoard.length) {
    console.log('i');
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
  j = parseInt(j);
  i = parseInt(i);

  console.log(`${i} & ${j}`);
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