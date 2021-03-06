document.addEventListener("DOMContentLoaded", () => {
  const width = 10;
  let nextRandom = 0;
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  const grid = document.querySelector(".grid");
  console.log(squares);
  let timerId;
  let scores = 0;

  const colors = ["orange", "red", "purple", "green", "blue"];

  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const squareTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const Tetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    squareTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  console.log(Tetrominoes[0][0]);

  //Random selection of tetrominoes
  let random = Math.floor(Math.random() * Tetrominoes.length);
  let current = Tetrominoes[random][currentRotation];

  //draw the tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }

  //Undraw the tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.backgroundColor = "";
    });
  }

  //Making tetromino move down every second
  timerId = setInterval(moveDown, 500);

  //giving keyCodes to the functions.
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      Rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keyup", control);

  //Move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //freeze function to freeze bottom row grid of the tetris pad

  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      //Start a new tetromino to fall
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * Tetrominoes.length);
      current = Tetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      showShape();
      addScore();
      gameOver();
    }
  }
  function atRight() {
    return current.some((index) => (currentPosition + index) % width == 0);
  }

  function atLeft() {
    return current.some((index) => (currentPosition + index) % width == 0);
  }

  //To move tetromino to the left until the blockage boundary.
  function moveLeft() {
    undraw();
    const leftBoundary = current.some(
      (index) => (currentPosition + index) % width === 0
    );

    if (!leftBoundary) currentPosition -= 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }

  // To move the Tetromino on the right side till the specific boundary of tetris pad.
  function moveRight() {
    undraw();
    const rightBoundary = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    if (!rightBoundary) currentPosition += 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }
  function checkRotatedPosition(p) {
    p = p || currentPosition;
    if ((p + 1) % width < 4) {
      if (atRight()) {
        currentPosition += 1;
        checkRotatedPosition(p);
      }
    } else if (p % width > 5) {
      if (atLeft()) {
        currentPosition -= 1;
        checkRotatedPosition(p);
      }
    }
  }

  //To rotate the tetromino
  function Rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      //if the current rotation gets to 4, it will go back to 0
      currentRotation = 0;
    }
    current = Tetrominoes[random][currentRotation];
    draw();
  }

  //TO show the next tetromino in display (min=-grid)
  const showSquares = document.querySelectorAll(".mini-grid div");
  const showWidth = 4;
  let displayIndex = 0;

  //The tetromino without rotations
  const upNextTetromino = [
    [1, showWidth + 1, showWidth * 2 + 1, 2], //L-Tetromino
    [0, showWidth, showWidth + 1, showWidth * 2 + 1], //Z-Tetromino
    [1, showWidth, showWidth + 1, showWidth + 2], //T-tetromino
    [0, 1, showWidth, showWidth + 1], //square-tetromino
    [1, showWidth + 1, showWidth * 2 + 1, showWidth * 3 + 1], //I-tetromino
  ];

  //Displaying the shape in the mini-grid display
  function showShape() {
    showSquares.forEach((squares) => {
      squares.classList.remove("tetromino");
      squares.style.backgroundColor = "";
    });
    upNextTetromino[nextRandom].forEach((index) => {
      showSquares[showWidth + index].classList.add("tetromino");
      showSquares[showWidth + index].style.backgroundColor = colors[nextRandom];
    });
  }

  //Adding function to the button.
  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * Tetrominoes.length);
      showShape();
    }
  });

  //To add scores
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];
      if (row.every((index) => squares[index].classList.contains("taken"))) {
        scores += 10;
        scoreDisplay.innerHTML = scores;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
          squares[index].style.backgroundColor = "";
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  //Game over function
  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML = "end";
      clearInterval(timerId);
    }
  }
});
