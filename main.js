/*

// Asks for boardSize
function askForDifficulty() {
  process.stdout.write('What difficulty would you like to play on:')
  process.stdin.pause();
  process.stdin.on("readable", function() {
    let difficulty = process.stdin.read().toString().trim();
    
    if (difficulty = 'Easy') {
      return 5;
    } else if (difficulty = 'Medium') {
      return 10;
    } else if (difficulty = 'Hard') {
      console.log('15');
      return 15;
    } else {
      console.log('Please choose one of the selected difficulties');
      askForDifficulty();
    }

    process.exit();
  });

}
*/


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

for (let i = 0; i < gameBoard.length; i++) {
  for (let j = 0; j < gameBoard.length; j++) {
    if (gameBoard[i][j].type == 'land') {
      // Middle Section
      if (i >= 1 & i <= (boardSize - 2) & j >= 1 & j <= (boardSize - 2)) {
        calcSurrMiddle(i, j, gameBoard);
      } else if (i == 0 && j == 0) { // All corners

      } else if (i == 0 && j == (boardSize - 2)) {

      } else if (i == (boardSize - 2) && j == 0) {

      } else if (i == (boardSize - 2) && j == (boardSize - 2)) {

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
    gameBoard[randomIntRow][randomIntCol].status = 'revealed';
    
  }
}

function checkSurr (i, j, gameBoard, surroundingNum) {
  if (gameBoard[i][j].type == 'mine') {
    surroundingNum++;
  }

  return surroundingNum;

}


calcSurrMidd(i, j, gameBoard) {
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
  gameBoard[i][j].status = 'revealed';
}
