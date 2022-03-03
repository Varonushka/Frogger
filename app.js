const timeLeftDisplay = document.querySelector("#timeLeft");
const resultDisplay = document.querySelector("#result");
const startPauseBTN = document.querySelector("#startPauseBTN");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".logLeft");
const carsLeft = document.querySelectorAll(".carLeft");
const logsRight = document.querySelectorAll(".logRight");
const carsRight = document.querySelectorAll(".carRight");
const width = 9;

let currentIndex = 76;
let timerID;
let currentTime = 20;
let outcomeTimerId;

function moveFrog(e) {
  squares[currentIndex].classList.remove("frog");

  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % width !== 0) currentIndex -= 1;
      break;
    case "ArrowRight":
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;
    case "ArrowUp":
      if (currentIndex - width >= 0) currentIndex -= width;
      break;
    case "ArrowDown":
      if (currentIndex + width < width * width) currentIndex += width;
      break;
  }
  squares[currentIndex].classList.add("frog");
}

function autoMoveElements() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
  carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
  logsRight.forEach((logRight) => moveLogRight(logRight));
  carsRight.forEach((carRight) => moveCarRight(carRight));
}

function checks() {
  lose();
  win();
}

function moveCarLeft(_carLeft) {
  switch (true) {
    case _carLeft.classList.contains("c1"):
      _carLeft.classList.remove("c1");
      _carLeft.classList.add("c2");
      break;
    case _carLeft.classList.contains("c2"):
      _carLeft.classList.remove("c2");
      _carLeft.classList.add("c3");
      break;
    case _carLeft.classList.contains("c3"):
      _carLeft.classList.remove("c3");
      _carLeft.classList.add("c1");
      break;
  }
}

function moveCarRight(_carRight) {
  switch (true) {
    case _carRight.classList.contains("c1"):
      _carRight.classList.remove("c1");
      _carRight.classList.add("c3");
      break;
    case _carRight.classList.contains("c2"):
      _carRight.classList.remove("c2");
      _carRight.classList.add("c1");
      break;
    case _carRight.classList.contains("c3"):
      _carRight.classList.remove("c3");
      _carRight.classList.add("c2");
      break;
  }
}

function moveLogLeft(_logLeft) {
  switch (true) {
    case _logLeft.classList.contains("l1"):
      _logLeft.classList.remove("l1");
      _logLeft.classList.add("l2");
      break;
    case _logLeft.classList.contains("l2"):
      _logLeft.classList.remove("l2");
      _logLeft.classList.add("l3");
      break;
    case _logLeft.classList.contains("l3"):
      _logLeft.classList.remove("l3");
      _logLeft.classList.add("l4");
      break;
    case _logLeft.classList.contains("l4"):
      _logLeft.classList.remove("l4");
      _logLeft.classList.add("l5");
      break;
    case _logLeft.classList.contains("l5"):
      _logLeft.classList.remove("l5");
      _logLeft.classList.add("l1");
      break;
  }
}

function moveLogRight(_logRight) {
  switch (true) {
    case _logRight.classList.contains("l1"):
      _logRight.classList.remove("l1");
      _logRight.classList.add("l5");
      break;
    case _logRight.classList.contains("l2"):
      _logRight.classList.remove("l2");
      _logRight.classList.add("l1");
      break;
    case _logRight.classList.contains("l3"):
      _logRight.classList.remove("l3");
      _logRight.classList.add("l2");
      break;
    case _logRight.classList.contains("l4"):
      _logRight.classList.remove("l4");
      _logRight.classList.add("l3");
      break;
    case _logRight.classList.contains("l5"):
      _logRight.classList.remove("l5");
      _logRight.classList.add("l4");
      break;
  }
}

function lose() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    currentTime <= 0
  ) {
    resultDisplay.textContent = "You lose!";
    clearInterval(timerID);
    clearInterval(outcomeTimerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
  }
}

function win() {
  if (squares[currentIndex].classList.contains("endBlock")) {
    resultDisplay.textContent = "You win!";
    clearInterval(timerID);
    clearInterval(outcomeTimerId);
    document.removeEventListener("keyup", moveFrog);
  }
}
startPauseBTN.addEventListener("click", () => {
  if (timerID) {
    clearInterval(timerID);
    clearInterval(outcomeTimerId);
    outcomeTimerId = null;
    timerID = null;
    document.removeEventListener("keyup", moveFrog);
  } else {
    timerID = setInterval(autoMoveElements, 1000);
    outcomeTimerId = setInterval(checks, 50);
    document.addEventListener("keyup", moveFrog);
  }
});
