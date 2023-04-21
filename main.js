// query selectors
var userID = document.querySelector("#user-name");
var userAvatar = document.querySelector("#avatar");
var formSubmitBtn = document.querySelector(".form-submit-btn");
var formNewSubmitBtn = document.querySelector(".form-new-submit-btn");
var domPlayerIcon = document.querySelector(".player-icon");
var domPlayerName = document.querySelector(".player-name");
var domPlayerScore = document.querySelector(".player-score");
var userInputView = document.querySelector(".user-input-view");
var gameChoiceView = document.querySelector(".game-choice-view");
var chooseFighterView = document.querySelector(".choose-fighter-view");
var resultView = document.querySelector(".result-view");
var gameChoiceTitle = document.querySelector(".game-choice-title");
var gameChoiceContainer = document.querySelector(".game-choice-container");
var classicContainer = document.querySelector(".classic-container");
var difficultContainer = document.querySelector(".difficult-container");
var domSubHeading = document.querySelector("h2");
var domFighters = document.querySelector(".all-fighters");


//Global variables

var game = {
  logic: {},
  players: [createPlayer("Human", "❔", 0), createPlayer("Computer", "&#x1F4BB;", 0)],
  subHeading: changeSubHeading(),
  fighters: [],
};

// event listeners
userID.addEventListener("keyup", allowSubmit);
formSubmitBtn.addEventListener("click", fetchUserData);
classicContainer.addEventListener("click", setClassicLogic);
difficultContainer.addEventListener("click", setDifficultLogic);
domFighters.addEventListener("mouseover", function(event) {
  showBeatCard(event);
});
domFighters.addEventListener("mouseout", function(event) {
  hideBeatCard(event);
});
domFighters.addEventListener("click", function(event) {
  setPlayerChoice(event);
});

// orchestrating functions
function fetchUserData() {
  game.players[0] = createPlayer(userID.value, userAvatar.value, 0);
  renderPlayer(game.players[0], domPlayerIcon, domPlayerName, domPlayerScore);
  toggleView([userInputView], [gameChoiceView]);
  game.subHeading = changeSubHeading();
  renderSubHeading(domSubHeading, game.subHeading);
}

function setClassicLogic() {
  game.logic = createClassicGame(game.logic);
  game.fighters = setFighters(game);
  toggleView([gameChoiceView], [chooseFighterView]);
  game.subHeading = changeSubHeading();
  renderSubHeading(domSubHeading, game.subHeading);
  showFighters(game);
}

function setDifficultLogic() {
  game.logic = createDifficultGame(game.logic);
  game.fighters = setFighters(game);
  toggleView([gameChoiceView], [chooseFighterView]);
  game.subHeading = changeSubHeading();
  renderSubHeading(domSubHeading, game.subHeading);
  showFighters(game);
}

function showFighters(gameObject) {
  createAllHTML(gameObject);
  renderFighters(gameObject);
}

function setPlayerChoice(event) {
  game.players[0] = assignChoice(event, game.players[0]);
  game.subHeading = changeSubHeading();
  renderSubHeading(domSubHeading, game.subHeading);
}

// Data model functions 
function changeSubHeading() {
  if (!userInputView.classList.contains("hidden")) {
    return "Enter your details";
  } else if (!gameChoiceView.classList.contains("hidden")) {
    return "Select the game type";
  } else if (!chooseFighterView.classList.contains("hidden")) {
    return "Choose your fighter";
  } else if (!resultView.classList.contains("hidden")) {
    return "Verdict is out!";
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

function createPlayer(label, icon, score) {
  var player = {
    name: label,
    avatar: icon,
    wins: score,
    choice: ""
  };
  return player;
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
    rock: ["scissors", "lizard"], 
    scissors: ["paper", "lizard"], 
    paper: ["rock", "alien"], 
    lizard: ["paper", "alien"],
    alien: ["scissors", "rock"] 
  };
  logicObject = {...proxyLogic};
  return logicObject;
}

function setFighters(gameObject) {
  return Object.keys(gameObject.logic);
}

function assignChoice(event, playerObject) {
  var proxyPlayer = {...playerObject};
  proxyPlayer.choice = event.target.id;
  playerObject = proxyPlayer;
  return playerObject;
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
  var winFound = false;

  for (var i = 0; i < logicObject[playerChoice].length; i++) {
    if(logicObject[playerChoice][i] === computerChoice) {
      winFound = true;
    }
  }

  if (winFound) {
    humanPlayer = addToWins(humanPlayer);
    return `Player won`
  } else {
    computerPlayer = addToWins(computerPlayer);
    return `Computer won`
  }
}

function checkDraw(playerChoice, computerChoice) {
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

function createAllHTML(gameObject) {
  var htmlCode = "";
  for (var i = 0; i < gameObject.fighters.length; i++) {
    htmlCode += createSingleHTML(gameObject.fighters[i], gameObject);
  }
  return htmlCode
}

function renderFighters(gameObject) {
  domFighters.innerHTML = createAllHTML(gameObject);
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

