const PACMAN = '😬';

var gPacman;
var gBite = new Audio(src = "sounds/ping.mp3");

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
  gFoodCount--
}

var deadGhosts = [];

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;
  if (nextLocation.i === -1 || nextLocation.i === 10 ||
    nextLocation.j === -1 || nextLocation.j === 10) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    gBite.play();
    updateScore(1);
    gFoodCount--;
    if (gFoodCount === 0) gameOver(true);
  }
  else if (nextCell === CHERRY) {
    gBite.play();
    updateScore(10);
  }

  else if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return;
    gBite.play();
    gPacman.isSuper = true;
    setTimeout(unSuper, 5000);
  }
  else if (nextCell === GHOST) {

    if (!gPacman.isSuper) {
      gameOver(false)
      renderCell(gPacman.location, EMPTY);
      return;
    }
    killedGhost(nextLocation);
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}

function unSuper() {
  gPacman.isSuper = false;
  gGhosts = gGhosts.concat(deadGhosts);
  deadGhosts = [];
}

function killedGhost(ghostLocation) {
  for (var i = 0; i < gGhosts.length; i++) {
    if (gGhosts[i].location.i === ghostLocation.i &&
      gGhosts[i].location.j === ghostLocation.j) {
      var deadGhost = gGhosts.splice(i, 1);
      deadGhosts.push(deadGhost[0]);
      if (deadGhost[0].currCellContent === FOOD) {
        gFoodCount--;
        deadGhost[0].currCellContent = EMPTY;
      }
    }
  }
}