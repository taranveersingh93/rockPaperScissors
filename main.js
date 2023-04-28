// query selectors
var playerIcon = document.querySelector(".player-icon");
var playerName = document.querySelector(".player-name");
var playerScore = document.querySelector(".human-score");
var computerScore = document.querySelector(".computer-score");
var subHeading = document.querySelector("h2");
var userInputView = document.querySelector(".user-input-view");
var userID = document.querySelector("#user-name");
var userAvatar = document.querySelector("#avatar");
var submitBtn = document.querySelector(".form-submit-btn");
var gameChoiceView = document.querySelector(".game-choice-view");
var gameChoiceContainer = document.querySelector(".game-choice-container");
var gameViewBtn = document.querySelector(".reload-game-view");
var classicContainer = document.querySelector(".classic-container");
var difficultContainer = document.querySelector(".difficult-container");
var chooseFighterView = document.querySelector(".choose-fighter-view");
var allFighters = document.querySelector(".all-fighters");
var resultViewFighters = document.querySelector(".both-fighters");
var resultView = document.querySelector(".result-view");

// global variables
var game = createFirstGame();
var timerID;

// event listeners
userID.addEventListener("keyup", allowSubmit);
submitBtn.addEventListener("click", function() {
  game = setUserData(game);
  showGameChoice();
});
gameChoiceContainer.addEventListener("mouseover", function(event) {
    showRules(event);
});
gameChoiceContainer.addEventListener("mouseout", function(event) {
    collapseRules(event);
});
gameChoiceContainer.addEventListener("click", function(event) {
  if (event.target.closest(".game-card")) {
    game = setGameData(event, game);
    showGameBoard();
  }
});
allFighters.addEventListener("mouseover", function(event) {
  showBeatCard(event);
});
allFighters.addEventListener("mouseout", function(event) {
  hideBeatCard(event);
});
allFighters.addEventListener("click", function(event) {
  setPlayerChoice(event);
});
resultViewFighters.addEventListener("click", function(event) {
  fightOrFlight(event);
});
gameViewBtn.addEventListener("click", function() {
  updateReferenceView(game, "chooseGame");
  reloadGameSelection();
})


// functions

function createFirstGame() {
  var game = {
    logic: {},
    players: [createPlayer("Human", "❔", 0), createPlayer("Computer", "💻", 0)],
    fighters: [],
    lastResult: "",
    referenceView: "userInput",
    subHeading: "Enter your details"
  };

  return game;
}

function setUserData(gameObject) {
  var proxyGame = {...gameObject};
  var userName = assignCase(userID.value);
  proxyGame.players[0] = createPlayer(userName, userAvatar.value, 0);
  updateReferenceView(proxyGame, "chooseGame");
  gameObject = proxyGame;
  return gameObject;
}

function createPlayer(label, icon, score) {
  var player = {
    name: label,
    avatar: icon,
    wins: score,
    choice: ""
  };
  return player;
}

function generateClassicLogic() {
  var classicLogic = {
    scissors: ["paper"],
    paper: ["rock"],
    rock: ["scissors"]
  };

  return classicLogic;
}

function generateDifficultLogic() {
  var difficultLogic = {  
    rock: ["scissors", "lizard"], 
    scissors: ["paper", "lizard"], 
    paper: ["rock", "alien"], 
    lizard: ["paper", "alien"],
    alien: ["scissors", "rock"] 
  };

  return difficultLogic;
}

function setFighters(gameObject) {
  return Object.keys(gameObject.logic);
}

function createGame (logic, gameObject) {
  var proxyObject = {...gameObject};
  if (logic === "classic") {
    proxyObject.logic = generateClassicLogic();
  } else {
    proxyObject.logic = generateDifficultLogic();
  }

  proxyObject.fighters = setFighters(proxyObject);
  gameObject = proxyObject;
  return gameObject;
}

function setGameData(event, gameObject) {
  if (event.target.closest(".game-card")?.classList.contains("classic-container")) {
    gameObject = createGame("classic", gameObject);
  } else if (event.target.closest(".game-card")?.classList.contains("difficult-container")) {
    gameObject = createGame("difficult", gameObject);
  }

  updateReferenceView(gameObject, "chooseFighter");
  return gameObject;
}

function setPlayerChoice(event) {
  if (event.target.classList.contains("single-fighter")) {
    console.log(event.target.id);
    prepareFightData(event);
    goToReveal();
  }
}
function prepareFightData(event) {
  game = assignHumanChoice(event, game);
  game = compChoose(game);
  updateReferenceView(game, "revealResult");
}

function assignHumanChoice(event, gameObject) {
  var proxyGame = {...gameObject};
  proxyGame.players[0].choice = event.target.id;
  gameObject = proxyGame;
  return gameObject;
}

function compChoose(gameObject) {
  var proxyGame = {...gameObject};
  var randomFighter = proxyGame.fighters[getRandomIndex(proxyGame.fighters)];
  proxyGame.players[1].choice = randomFighter;
  gameObject = proxyGame;
  return gameObject;
}

function fightOrFlight(event) {
  var cardIsClosed = event.target.classList.contains("result-unknown");
  var cardIsOpen = event.target.classList.contains("result-card") || event.target.classList.contains("result-single-fighter");
  if (cardIsClosed) {
    game = processResult(game);
    proceedToResult();
  } else if (cardIsOpen) {
    reloadFighterSelection();
  }
}

function processResult(gameObject) {
  if (checkDraw(gameObject)) {
    gameObject = processDraw(gameObject);
  } else if (checkPlayerWin(gameObject)) {
    gameObject = processWin(gameObject);
  } else {
    gameObject = processLoss(gameObject);
  }
  return gameObject;
}

function checkDraw(gameObject) {
  var playerChoice = gameObject.players[0].choice;
  var computerChoice = gameObject.players[1].choice;
  return playerChoice === computerChoice;
}

function checkPlayerWin(gameObject) {
  var winFound = false;
  var playerChoice = gameObject.players[0].choice;
  var computerChoice = gameObject.players[1].choice;
  for (var i = 0; i < gameObject.logic[playerChoice].length; i++) {
    if (gameObject.logic[playerChoice][i] === computerChoice) {
      winFound = true;
    }
  }
  return winFound;
}

function processDraw(gameObject) {
  var proxyObject = {...gameObject};
  proxyObject.lastResult = "draw";
  updateReferenceView(proxyObject, "declareDraw");
  gameObject = proxyObject;
  return gameObject;
}

function processWin(gameObject) {
  var proxyObject = {...gameObject};
  proxyObject.lastResult = "win";
  proxyObject.players[0].wins++;
  updateReferenceView(proxyObject, "declareWin");
  gameObject = proxyObject;
  return gameObject;
}

function processLoss(gameObject) {
  var proxyObject = {...gameObject};
  proxyObject.lastResult = "loss";
  proxyObject.players[1].wins++;
  updateReferenceView(proxyObject, "declareLoss");
  gameObject = proxyObject;
  return gameObject;
}

// helper functions

function updateReferenceView(gameObject, view) {
  gameObject.referenceView = view;
  gameObject.subHeading = changeSubHeading(gameObject);
}

function changeSubHeading(gameObject) {
  var subHeading = "";
  var referenceObject = {
    userInput: "Enter your details",
    chooseGame: "Select the game type",
    chooseFighter: "Choose your fighter",
    revealResult: "Reveal computer's choice",
    declareDraw: "😞 It's a Draw! 😞",
    declareLoss: `${gameObject.players[1].avatar} Computer won this round! ${gameObject.players[1].avatar}`,
    declareWin: `${gameObject.players[0].avatar.toString()} You won this round! ${gameObject.players[0].avatar.toString()}`
  };

  subHeading = referenceObject[gameObject.referenceView];
  return subHeading;
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function assignCase(name) {
  return name[0].toUpperCase() + name.slice(1);
}
