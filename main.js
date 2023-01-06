//
const boardSize = 8;

// Creating the board
let gameBoard = new Array(boardSize);
for (let i = 0; i < gameBoard.length; i++) {
  gameBoard[i] = new Array(boardSize);
}

// Filling the board out with values
for (let i = 0; i < gameBoard.length; i++) {
  for (let j = 0; j < gameBoard.length; j++) {
    gameBoard[i][j] = i;
  }
}

showBoard(gameBoard); 


function showBoard (gameBoard) {
  console.log('---------------------------------');
  for (let i = 0; i < gameBoard.length; i++) {
    let rowString = ''
    for (let j = 0; j < gameBoard.length; j++) {
      rowString += ` ${gameBoard[i][j]} |`;

    }
    process.stdout.write('|')
    console.log(rowString);
    console.log('---------------------------------');
  }


}