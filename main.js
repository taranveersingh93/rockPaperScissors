// query selectors
// constant elements
var domPlayerIcon = document.querySelector(".player-icon");
var domPlayerName = document.querySelector(".player-name");
var domPlayerScore = document.querySelector(".human-score");
var domComputerScore = document.querySelector(".computer-score");
var domSubHeading = document.querySelector("h2");

// user input view
var userInputView = document.querySelector(".user-input-view");
var domUserID = document.querySelector("#user-name");
var domUserAvatar = document.querySelector("#avatar");
var domSubmitBtn = document.querySelector(".form-submit-btn");

// game choice view
var gameChoiceView = document.querySelector(".game-choice-view");
var gameChoiceContainer = document.querySelector(".game-choice-container");
var gameViewBtn = document.querySelector(".reload-game-view");
var classicContainer = document.querySelector(".classic-container");
var difficultContainer = document.querySelector(".difficult-container");

// choose fighters view
var chooseFighterView = document.querySelector(".choose-fighter-view");
var domFighters = document.querySelector(".all-fighters");
var domResultFighters = document.querySelector(".both-fighters");

// result view
var resultView = document.querySelector(".result-view");

//Global variables
var game = createFirstGame();
var timerID;

// event listeners
domUserID.addEventListener("keyup", allowSubmit);
domSubmitBtn.addEventListener("click", fetchUserData);
gameChoiceContainer.addEventListener("click", function(event) {
  if(event.target.classList?.contains("game-card")) {
    game = setGameData(event, game);
    showGameBoard();
  }
});
gameChoiceContainer.addEventListener("mouseover", function(event) {
  if(event.target.classList) {
    showRules(event);
  }
})
gameChoiceContainer.addEventListener("mouseout", function(event) {
  if(event.target.classList) {
    collapseRules(event);
  }
})
domFighters.addEventListener("mouseover", function(event) {
  showBeatCard(event);
});
domFighters.addEventListener("mouseout", function(event) {
  hideBeatCard(event);
});
domFighters.addEventListener("click", function(event) {
  setPlayerChoice(event);
});
domResultFighters.addEventListener("click", function(event) {
  displayResult(event);
});
gameViewBtn.addEventListener("click", function() {
  reloadGameSelection();
})

// orchestrating functions

function fetchUserData() {
  var userName = assignCase(domUserID.value);

  game.players[0] = createPlayer(userName, domUserAvatar.value, 0);
  renderPlayer(game.players[0], domPlayerIcon, domPlayerName);
  renderScore();
  toggleView(userInputView, gameChoiceView);
  game.subHeading = changeSubHeading();
  renderTextToElement(game.subHeading, domSubHeading);
}

function reloadGameSelection() {
  toggleView(chooseFighterView, gameChoiceView);
  hideDomElement(gameViewBtn);
  game.subHeading = changeSubHeading();
  renderTextToElement(game.subHeading, domSubHeading);
}

function reloadFighterSelection() {
  clearTimeout(timerID);
  toggleView(resultView, chooseFighterView);
  showDomElement(gameViewBtn);
  game.subHeading = changeSubHeading();
  renderTextToElement(game.subHeading, domSubHeading);
  showFighters(game);
}

function showRules(event) {
  var classicRulesDiv = classicContainer.querySelector(".game-rules");
  var difficultRulesDiv = difficultContainer.querySelector(".game-rules");

  if(event.target.closest(".game-card")?.classList.contains("classic-container")) {
    var rules = classicRulesDiv.querySelectorAll("h4");
    classicRulesDiv.classList.add("visible-classic");
    for (var i = 0; i < rules.length; i++) {
      rules[i].classList.add("visible");
    }
  } else if(event.target.closest(".game-card")?.classList.contains("difficult-container")) {
      var rules = difficultRulesDiv.querySelectorAll("h4");
      difficultRulesDiv.classList.add("visible-difficult");
      for (var i = 0; i < rules.length; i++) {
        rules[i].classList.add("visible");
      }
    }
}

function collapseRules(event) {
  var classicRulesDiv = classicContainer.querySelector(".game-rules");
  var difficultRulesDiv = difficultContainer.querySelector(".game-rules");

  if(event.target.closest(".game-card")?.classList.contains("classic-container")) {
    var rules = classicRulesDiv.querySelectorAll("h4");
    for (var i = 0; i < rules.length; i++) {
      classicRulesDiv.querySelector("h4").classList.remove("visible");
    }
    classicRulesDiv.classList.remove("visible-classic");
  } 

  if(event.target.closest(".game-card")?.classList.contains("difficult-container")) {
    var rules = difficultRulesDiv.querySelectorAll("h4");
    for (var i = 0; i < rules.length; i++) {
      difficultRulesDiv.querySelector("h4").classList.remove("visible");
    }
    difficultRulesDiv.classList.remove("visible-difficult");
  } 
}

function showGameBoard() {
  toggleView(gameChoiceView, chooseFighterView);
  showDomElement(gameViewBtn);
  renderTextToElement(game.subHeading, domSubHeading);
  showFighters(game);
}

function showFighters(gameObject) {
  createAllFighterHTML(gameObject);
  renderFighters(gameObject);
}

function setPlayerChoice(event) {
  if (event.target.classList.contains("single-fighter")) {
    game = assignChoice(event, game);
    game = compChoose(game)
    toggleView(chooseFighterView, resultView);
    showDomElement(gameViewBtn);
    game.subHeading = changeSubHeading();
    renderTextToElement(game.subHeading, domSubHeading);
    renderResultPage();
  }
}

function renderScore() {
  domPlayerScore.innerText = `Wins: ${game.players[0].wins}`;
  domComputerScore.innerText = `Wins: ${game.players[1].wins}`;
}

function renderDraw(userCard, compCard) {
  userCard.classList.add("loser");
  compCard.classList.add("loser");
  renderScore();
}

function renderWin(userCard, compCard) {
  userCard.classList.add("winner");
  compCard.classList.add("loser");
  renderScore();
}

function renderLoss(userCard, compCard) {
  userCard.classList.add("loser");
  compCard.classList.add("winner");
  renderScore();
}

function announceResult() {
  var humanCard = document.querySelector(".human-card");
  var computerCard = document.querySelector(".comp-card");
  renderTextToElement(game.subHeading, domSubHeading);
  if(game.lastResult === "draw") {
    renderDraw(humanCard, computerCard);
  } else if (game.lastResult === "win") {
    renderWin(humanCard, computerCard);
  } else {
    renderLoss(humanCard, computerCard);
  }
  timerID = setTimeout(reloadFighterSelection, 4000);
}

function displayResult(event) {
  if(event.target.classList.contains("result-unknown")) {
    var domRevealCard = document.querySelector(".result-unknown");
    var domComputerCard = document.querySelector(".comp-card");
    toggleView(domRevealCard, domComputerCard);
    game = processResult(game);
    setTimeout(announceResult, 300);
  } else if (event.target.classList.contains("result-card") || event.target.classList.contains("result-single-fighter")) {
    reloadFighterSelection();
  }
}



// Data model functions 

function setFighters(gameObject) {
  return Object.keys(gameObject.logic);
}

function createGame (logic, gameObject) {
  var proxyObject = {...gameObject};
  var classicLogic = {
    scissors: ["paper"],
    paper: ["rock"],
    rock: ["scissors"]
  };
  var difficultLogic = {  
    rock: ["scissors", "lizard"], 
    scissors: ["paper", "lizard"], 
    paper: ["rock", "alien"], 
    lizard: ["paper", "alien"],
    alien: ["scissors", "rock"] 
  };

  if (logic === "classic") {
    proxyObject.logic = classicLogic;
  } else {
    proxyObject.logic = difficultLogic;
  }
  
  gameObject = proxyObject;
  return gameObject;
}

function setGameData(event, gameObject) {
  
  if(event.target.closest(".game-card").classList.contains("classic-container")) {
    gameObject = createGame("classic", gameObject)
  } 
  if(event.target.closest(".game-card").classList.contains("difficult-container")) {
    gameObject = createGame("difficult", gameObject)
  };
  gameObject.fighters = setFighters(gameObject);
  gameObject.subHeading = changeSubHeading();

  return gameObject;
}

function createFirstGame() {
  var game = {
    logic: {},
    players: [createPlayer("Human", "❔", 0), createPlayer("Computer", "💻", 0)],
    subHeading: changeSubHeading(),
    fighters: [],
    lastResult: ""
  }
  return game;
}

function changeSubHeading() {
  if (!userInputView.classList.contains("hidden")) {
    return "Enter your details";
  } else if (!gameChoiceView.classList.contains("hidden")) {
    return "Select the game type";
  } else if (!chooseFighterView.classList.contains("hidden")) {
    return "Choose your fighter";
  } else if (!resultView.classList.contains("hidden")) {
    return "Reveal computer's choice!";
  }
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
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

function assignChoice(event, gameObject) {
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

function addToWins(playerObject) {
  var proxyPlayer = {...playerObject};
  proxyPlayer.wins++;
  playerObject = proxyPlayer;
  return playerObject
}

function checkPlayerWin(gameObject) {
  var winFound = false;
  var playerChoice = gameObject.players[0].choice;
  var computerChoice = gameObject.players[1].choice;
  for (var i = 0; i < gameObject.logic[playerChoice].length; i++) {
    if(gameObject.logic[playerChoice][i] === computerChoice) {
      winFound = true;
    }
  }
  return winFound;
}

function checkDraw(gameObject) {
  var playerChoice = gameObject.players[0].choice;
  var computerChoice = gameObject.players[1].choice;
  return playerChoice === computerChoice
}

function processDraw(gameObject) {
  var proxyObject = {...gameObject};
  proxyObject.lastResult = "draw";
  proxyObject.subHeading = "😞 It's a Draw! 😞"
  gameObject = proxyObject;
  return gameObject;
}

function processWin(gameObject) {
  var proxyObject = {...gameObject};
  proxyObject.lastResult = "win";
  proxyObject.players[0].wins++;
  proxyObject.subHeading = `${proxyObject.players[0].avatar.toString()} You won this round! ${proxyObject.players[0].avatar.toString()}`
  gameObject = proxyObject;
  return gameObject;
}

function processLoss(gameObject) {
  var proxyObject = {...gameObject};
  proxyObject.lastResult = "loss";
  proxyObject.players[1].wins++;
  proxyObject.subHeading = `${proxyObject.players[1].avatar} Computer won this round! ${proxyObject.players[1].avatar}`
  gameObject = proxyObject;
  return gameObject;
}

function processResult(gameObject) {
  if(checkDraw(gameObject)) {
    gameObject = processDraw(gameObject);
  } else if (checkPlayerWin(gameObject)) {
    console.log("player win")
    gameObject = processWin(gameObject);
  } else {
    console.log("player loss")
    gameObject = processLoss(gameObject);
  }
  return gameObject;
}

//DOM functions
function renderTextToElement(variable, dom) {
  dom.innerText = variable;
}

function allowSubmit() {
  if(domUserID.value) {
    domSubmitBtn.disabled = false;
    domSubmitBtn.classList.add("submit-btn-alt");
  } else {
    domSubmitBtn.disabled = true;
    domSubmitBtn.classList.remove("submit-btn-alt");
  }
}

function renderPlayer(playerObject, domIcon, domName) {
  domIcon.innerText = playerObject.avatar;
  domName.innerText = playerObject.name;
}

function createSingleHTML(fighter, gameObject) {
  var htmlCode = "";
  htmlCode += 
  `
  <section class="fighter-card">
    <img src="assets/${fighter}.png" alt="${fighter} icon" class="single-fighter" id="${fighter}">
      <div class="beat-card" id="${fighter}-beat-card">
        Beats
        <div class="beats">
  `
  for (var i = 0; i < gameObject.logic[fighter].length; i++) {
    htmlCode += 
    `
    <img class="beat-fighter" src="assets/${gameObject.logic[fighter][i]}.png">
    `
  }
          
  htmlCode += 
  `
        </div>
      </div>
  </section>
  `
  ;
  return htmlCode;
} 

function createAllFighterHTML(gameObject) {
  var htmlCode = "";
  for (var i = 0; i < gameObject.fighters.length; i++) {
    htmlCode += createSingleHTML(gameObject.fighters[i], gameObject);
  }
  return htmlCode
}

function renderFighters(gameObject) {
  domFighters.innerHTML = createAllFighterHTML(gameObject);
}

function showBeatCard(event) {
  if (event.target.classList.contains("single-fighter")) {
    var parentID = event.target.id;
    var cardID = `${parentID}-beat-card`;
    var targetCard = document.querySelector("#"+cardID);
    targetCard.classList.add("show");
  }
}

function hideBeatCard(event) {
  if(event.target.classList.contains("single-fighter")) {
    var parentID = event.target.id;
    var cardID = `${parentID}-beat-card`;
    var targetCard = document.querySelector("#"+cardID);
    targetCard.classList.remove("show");
  }
}

function createShowdownHTML(gameObject) {
  var htmlCode = 
  `
  <div class="result-card human-card">
    <img class="result-single-fighter" src="assets/${gameObject.players[0].choice}.png">
  </div>
  <div class="result-unknown">
    Click to reveal
  </div>
  <div class="result-card comp-card hidden">
    <img class="result-single-fighter" src="assets/${gameObject.players[1].choice}.png">
  </div>
  `;
  return htmlCode;
}

function renderResultPage() {
  domResultFighters.innerHTML = createShowdownHTML(game);
}
function hideDomElement(element) {
  element.classList.add("hidden");
}

function showDomElement(element) {
  element.classList.remove("hidden");
}

function assignCase(name) {
  return name[0].toUpperCase() + name.slice(1);
}

function toggleView(fromView, toView) {
  hideDomElement(fromView);
  showDomElement(toView);
}

