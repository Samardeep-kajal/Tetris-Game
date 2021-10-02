document.addEventListener("DOMContentLoaded", () => {
  const width = 10;
  let nextRandom = 0;
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const ScoreDisplay = document.querySelector("#score");
  const StartBtn = document.querySelector("#start-button");
  const grid = document.querySelector(".grid");
  console.log(squares);

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

  let random = Math.floor(Math.random() * Tetrominoes.length);
  let current = Tetrominoes[random][currentRotation];

  //draw the tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
    });
  }

  //Undraw the tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove(["tetromino"]);
    });
  }

  //Making tetromino move down every second
  timerId = setInterval(moveDown, 1000);

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
    }
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

  //To rotate the tetromino
  function Rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      //if the current rotation gets to 5, it will go back to 0
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
    });
    upNextTetromino[nextRandom].forEach((index) => {
      showSquares[showWidth + index].classList.add("tetromino");
    });
  }
});
