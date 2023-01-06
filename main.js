// Asks for boardSize
function askForDifficulty() {
  let difficulty = prompt("Would you like to play on Normal, Challenging or Expert difficulty");
  let boardSize = 0;
  if (difficulty = 'Normal') {
    return boardSize = 5
  } else if (difficulty = 'Challenging') {
    return boardSize = 10;
  } else if (difficulty = 'Expert') {
    return boardSize = 15;
  } else {
    console.log('Invalid difficulty provided. Please choose a requested difficulty');
    askForDifficulty();
  }
  
}

const boardSize = askForDifficulty();
console.log(boardSize);

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
  // Here, we add the numbers onto 'rowString' which is then printed on console.
  // Without this, there would be newline's between every cell. 
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