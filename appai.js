
//////////////// run when html loads /////////////////

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const scoreName = document.getElementById('score-name');
  const width = 28; //28*28 = 784
  let score = 0;

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ];

  const squares = [];
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  //draw grid and render it
  function createBoard() {
    for (var i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);

      if (layout[i] === 0) {
        squares[i].classList.add('pac-dot');
      }else if (layout[i] === 1) {
        squares[i].classList.add('wall');
      }else if (layout[i] === 2) {
        squares[i].classList.add('ghost-lair');
      }else if (layout[i] === 3) {
        squares[i].classList.add('fruit');
      }
    }
  }

  createBoard()

  //starting pacman position

  let pacmanCurrentIndex =  490;
  squares[pacmanCurrentIndex].classList.add('pac-man');

  //move pac-man
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man');

    switch (e.keyCode) {

      case 37:

      if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
      !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')) {
        pacmanCurrentIndex -=1;
      }
      //check if pac man is in the left exit
      if (pacmanCurrentIndex-1 === 363) {
        pacmanCurrentIndex = 391;
      }
      break;

      case 38:

      if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
      !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
        pacmanCurrentIndex -=width;
      }
      break;

      case 39:

      if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
      !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')) {
        pacmanCurrentIndex +=1;
      }
      //check if pacman is in the right exit
      if (pacmanCurrentIndex + 1 === 392) {
        pacmanCurrentIndex = 364;
      }

      break;

      case 40:

      if (pacmanCurrentIndex + width < width * width &&
      !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
      !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) {
        pacmanCurrentIndex +=width;
      }
      break;
    }

    squares[pacmanCurrentIndex].classList.add('pac-man');

    pacDotEaten();
    fruitEaten();
    checkForGameOver();
    checkForWin();
  }

  document.addEventListener('keydown', movePacman);

  //what happens when pac-man eats a pac dots
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score++;
      scoreDisplay.innerHTML = score;
      squares[pacmanCurrentIndex].classList.remove('pac-dot');
    }
  }

  //what happens when you eat a fruit
  function fruitEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('fruit')) {
      score += 10;
      ghosts.forEach(ghost => ghost.isScared = true);
      setTimeout(unScareGhosts, 10000);
      squares[pacmanCurrentIndex].classList.remove('fruit');
    }
  }

  //makes ghosts stop appearing aquamarine
  function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
  }


  //create ghost template
  class Ghost {
    constructor(className, startIndex, speed){
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.timerId = NaN;
      this.isScared = false;
    }
  }

  ghosts = [
    new Ghost("blinky", 348, 800),
    new Ghost("pinky", 376, 800),
    new Ghost("inky", 351, 800),
    new Ghost("clyde", 379, 800)
  ];

  //draw my ghosts onto the grid
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
  });

  //move the Ghosts randomly
  ghosts.forEach(ghost => moveGhost(ghost));

  //function to move ghosts
  function moveGhost(ghost) {
    const directions =  [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function() {
      //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
      if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
      !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
        //remove the ghosts classes
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
        //check ghost new position distance relative to pacman to make it come closer

        //coordinate arrays with x,y
        const ghostCoord = (getCoordinates(ghost.currentIndex));
        const pacmanCoord = (getCoordinates(pacmanCurrentIndex));
        const ghostNewCoord = (getCoordinates(ghost.currentIndex + direction));
        // console.log(pacmanCoord);
        // console.log();
        // console.log(ghostNewCoord);

        function isXCoordCloser() {
          if ((ghostNewCoord[0] - pacmanCoord[0]) > (ghostCoord[0] - pacmanCoord[0])) {
            console.log('true x');
            return true;
          } else {
            console.log('false x');
            return false;
          }
        }

        function isYCoordCloser() {
          if ((ghostNewCoord[1] - pacmanCoord[1]) > (ghostCoord[1] - pacmanCoord[1])) {
            console.log('true y');
            return true;
          } else {
            console.log('false y');
            return false;
          }
        }

        if (isXCoordCloser() || isYCoordCloser()) {
          //move into that space
          ghost.currentIndex += direction;
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }else{
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
          direction = directions[Math.floor(Math.random() * directions.length)];
        }
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        //else find a new random direction ot go in
      } else direction = directions[Math.floor(Math.random() * directions.length)];

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost');
      }

      //if ghosts are scared and pacman runs into them
      if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
        ghost.currentIndex = ghost.startIndex;
        score += 100;
        squares[ghost.currentIndex].classList.add(ghost.className);
      }
      checkForGameOver();
    }, ghost.speed);
  }

  //check coordinates for ghosts and pacman
  function getCoordinates(index) {
    return[index % width, Math.floor(index / width)];
  }

  //check for game over
  function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId));
      document.removeEventListener('keydown', movePacman);
      scoreName.innerHTML = 'A ghost killed you, you lost!';
    }
  }

  //check for a win
  function checkForWin() {
    if (score > 299) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId));
      document.removeEventListener('keydown', movePacman);
      scoreName.innerHTML = 'You reached 300, you won!';
    }
  }
});
