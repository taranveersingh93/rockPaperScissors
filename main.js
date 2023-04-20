// query selectors
var userID = document.querySelector("#user-name");
var userAvatar = document.querySelector("#avatar");
var formSubmitBtn = document.querySelector(".form-submit-btn");
var formNewSubmitBtn = document.querySelector(".form-new-submit-btn");
var playerIcon = document.querySelector(".player-icon");
var playerName = document.querySelector(".player-name");
var playerScore = document.querySelector(".player-score");
var userInputView = document.querySelector(".user-input-view");
var gameChoiceView = document.querySelector(".game-choice-view");
var chooseFighterView = document.querySelector(".choose-fighter-view");
var gameChoiceTitle = document.querySelector(".game-choice-title");
var gameChoiceContainer = document.querySelector(".game-choice-container");
var classicContainer = document.querySelector(".classic-container");
var difficultContainer = document.querySelector(".difficult-container");
var domSubHeading = document.querySelector("h2");


//Global variables
var computerPlayer = {
  name: "Computer",
  avatar: "&#x1F4BB;",
  wins: 0
};
var humanPlayer = {};
var gameLogic = {};
var subHeading;
var humanChoice;
var fighters = [];


// event listeners
userID.addEventListener("keyup", allowSubmit);
formSubmitBtn.addEventListener("click", fetchUserData);
classicContainer.addEventListener("click", setClassicLogic);
difficultContainer.addEventListener("click", setDifficultLogic);

// orchestrating functions
function fetchUserData() {
  humanPlayer = createPlayer(humanPlayer);
  renderPlayer(humanPlayer, playerIcon, playerName, playerScore);
  toggleView([userInputView], [gameChoiceView]);
  subHeading = changeSubHeading();
  renderSubHeading(domSubHeading, subHeading);
}

function setClassicLogic() {
  gameLogic = createClassicGame(gameLogic);
  fighters = setFighters();
  console.log(fighters);
  toggleView([gameChoiceView], [chooseFighterView])
  subHeading = changeSubHeading();
  renderSubHeading(domSubHeading, subHeading);
}

function setDifficultLogic() {
  gameLogic = createDifficultGame(gameLogic);
  fighters = setFighters();
  console.log(fighters);
  toggleView([gameChoiceView], [chooseFighterView])
  changeSubHeading();
  renderSubHeading(domSubHeading, subHeading);
}

// Data model functions 
function changeSubHeading() {
  if (!userInputView.classList.contains("hidden")) {
    return "Enter your details";
  } else if (!gameChoiceView.classList.contains("hidden")) {
    return "Select the game type";
  } else if (!chooseFighterView.classList.contains("hidden")) {
    return "Choose your fighter";
  }
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function allowSubmit() {
  if(userID.value) {
    formSubmitBtn.disabled = false;
    formSubmitBtn.classList.add("submit-btn-alt");
  } else {
    formSubmitBtn.disabled = true;
    formSubmitBtn.classList.remove("submit-btn-alt");
  }
}

function createPlayer(playerObject) {
  var proxyPlayer = {...playerObject};
  var label = userID.value;
  var icon = userAvatar.value;
  proxyPlayer.name = label;
  proxyPlayer.avatar = icon;
  proxyPlayer.wins = 0;
  playerObject = proxyPlayer;
  return playerObject;
}

function createClassicGame(logicObject) {
  var proxyLogic = {
    scissors: ["paper"],
    paper: ["rock"],
    rock: ["scissors"]
  };
  logicObject = {...proxyLogic};
  return logicObject;
}

function createDifficultGame(logicObject) {
  var proxyLogic = {
    rock: ["scissors, lizard"], 
    scissors: ["paper, lizard"], 
    paper: ["rock", "alien"], 
    lizard: ["paper", "alien"],
    alien: ["rock", "scissors"] 
  };
  logicObject = {...proxyLogic};
  return logicObject;
}

function setFighters() {
  return Object.keys(gameLogic);
}

function addToWins(playerObject) {
  var proxyPlayer = {...playerObject};
  proxyPlayer.wins++;
  playerObject = proxyPlayer;
  return playerObject
}

function compChoose(logicObject, fighters) {
  return fighters[getRandomIndex(fighters)];
}

function checkWinner(playerChoice, computerChoice, logicObject) {
  console.log("computer choice", computerChoice)
  var winFound = false;

  for (var i = 0; i < logicObject[playerChoice].length; i++) {
    if(logicObject[playerChoice][i] === computerChoice) {
      winFound = true;
    }
  }

  if (winFound) {
    console.log("player won")
    humanPlayer = addToWins(humanPlayer);
    console.log(computerPlayer)
    console.log(humanPlayer);
    return `Player won`
  } else {
    console.log("computer won")
    computerPlayer = addToWins(computerPlayer);
    console.log(computerPlayer)
    console.log(humanPlayer);
    return `Computer won`
  }
}

function checkDraw(playerChoice, computerChoice) {
  console.log(computerChoice, "computer choice")
  return playerChoice === computerChoice
}

function checkResult(yourChoice, logicObject) {
  var computerChoice = compChoose(logicObject);

  if(checkDraw(yourChoice, computerChoice)) {
    return `It's a draw`;
  } else {
    return checkWinner(yourChoice, computerChoice, logicObject);
  };
}


//DOM functions
function renderSubHeading(dom, variable) {
  dom.innerText = variable;
}

function renderPlayer(playerObject, domIcon, domName, domScore) {
  domIcon.innerText = playerObject.avatar;
  domName.innerText = playerObject.name;
  domScore.innerText = `Wins: ${playerObject.wins}`;
}

function hideDomElement(element) {
  element.classList.add("hidden");
}

function showDomElement(element) {
  element.classList.remove("hidden");
}

function toggleView(fromViews, toViews) {
  for (var i = 0; i < fromViews.length; i++) {
    hideDomElement(fromViews[i]);
  }
  for (var i = 0; i < toViews.length; i++) {
    showDomElement(toViews[i]);
  }
}

