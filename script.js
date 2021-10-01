document.addEventListener("DOMContentLoaded", () => {
  const width = 10;
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
    } else if (e.keycode === 38) {
      //rotate()
    } else if (e.keycode === 39) {
      moveRight();
    } else if (e.keycode === 40) {
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
      random = Math.floor(Math.random() * Tetrominoes.length);
      current = Tetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
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
    if (!leftBoundary) currentPosition += 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }
});
