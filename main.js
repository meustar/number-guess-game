// 1. 랜덤번호 지정

// 2. 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름

// 3. 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!

// 4. 랜덤번호가 < 유저번호 Down!!

// 5. 랜덤번호가 > 유저번호 Up!!

// 6. Reset버튼을 누르면 게임이 리셋된다.

// 7. 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)

// 8. 유저가 1 ~ 100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.

// 9. 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  // console.log("게임 시작");
  let userValue = userInput.value;
  // console.log(userValue);

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100사이 숫자를 입력해 주세요.";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.";
    return;
  }

  chances--;
  chanceArea.textContent = `남은기회: ${chances}번`;
  console.log("chance", chances);

  if (userValue < computerNum) {
    resultArea.textContent = "Up!!";
    // console.log("Up!!");
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!";
    // console.log("Down!!");
  } else {
    resultArea.textContent = "맞췄습니다!!";
    // console.log("맞췄습니다!!");
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);

  if (chances == 0) {
    gameOver = true;
    resultArea.textContent = `GAME OVER!! 정답은 ${computerNum}였습니다.`;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  // 새로운 번호가 생성
  pickRandomNum();
  // user input 창이 깨끗하게 정리되고.
  userInput.value = "";

  gameOver = false;
  playButton.disabled = false;
  chances = 5;
  chanceArea.textContent = `남은기회: ${chances}번`;
  //결과창이 바뀐다.
  resultArea.textContent = "결과";
  userValueList = [];
  history = [];
}

pickRandomNum();
