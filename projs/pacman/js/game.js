'use strict';
const WALL = '▩';
const FOOD = '●';
const EMPTY = ' ';
const SUPER_FOOD = '🍪';
const CHERRY = '🍒';

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};
var gFoodCount;



function init() {
  gBoard = buildBoard();
  hidePlayAgain();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  initScore();
  setInterval(placeRandomCherry, 15000)

  gGame.isOn = true;
}

function buildBoard() {
  gFoodCount = 0;
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodCount++
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
        gFoodCount--

      }
      if ((i === 1 && j === 1) || (i === 1 && j === 8) ||
        (i === 8 && j === 1) || (i === 8 && j === 8)) {
        board[i][j] = SUPER_FOOD;
        gFoodCount--;
      }
    }
  }
  return board;
}


function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver(isWin) {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  displayPlayAgain();
  if (isWin) {
    var elModal = document.querySelector('.modal');
    elModal.innerText = 'You are the champion!! Click to play again!';
  }
}

function displayPlayAgain() {
  var elModal = document.querySelector('.modal');
  elModal.classList.remove('hide');
  elModal.innerText = 'Play again!';
}

function hidePlayAgain() {
  var elModal = document.querySelector('.modal');
  elModal.classList.add('hide');
}


function initScore() {
  gGame.score = 0;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function placeRandomCherry() {
  if (!gGame.isOn) return;
  var emptyCells = getEmptyCells();
  if (!emptyCells.length >= 1) return;
  var currLocation = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)];
  gBoard[currLocation.i][currLocation.j] = CHERRY;
  renderCell(currLocation, CHERRY);
}



function getEmptyCells() {
  var emptyCells = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var currLocation = { i: i, j: j };
      if (gBoard[i][j] === EMPTY) emptyCells.push(currLocation);
    }
  }
  return emptyCells;
}