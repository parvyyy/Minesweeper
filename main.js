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
      type: '', // BOMB or NORMAL
      surrounding: -1, // To display the #
      status: 'hidden' // REVEALED or HIDDEN
    }
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