// query selectors
var userID = document.querySelector("#user-name");
var userAvatar = document.querySelector("#avatar");
var formSubmitBtn = document.querySelector(".form-submit-btn");
var formNewSubmitBtn = document.querySelector(".form-new-submit-btn");
var playerIcon = document.querySelector(".player-icon");
var playerName = document.querySelector(".player-name");
var playerScore = document.querySelector(".player-score");
var userInputView = document.querySelector(".user-input-view");
var gameView = document.querySelector(".game-view");
var gameChoiceTitle = document.querySelector(".game-choice-title");
var gameChoiceContainer = document.querySelector(".game-choice-container");

//Global variables
var computerPlayer = {
  name: "Computer",
  avatar: "&#x1F4BB;",
  wins: 0
};
var humanPlayer = {};

// event listeners
userID.addEventListener("keyup", allowSubmit);
formSubmitBtn.addEventListener("click", function() {
  humanPlayer = createPlayer(humanPlayer);
  renderPlayer(humanPlayer, playerIcon, playerName, playerScore);
  toggleView([userInputView], [gameChoiceTitle, gameChoiceContainer]);
});

// Data model functions 
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

//DOM functions

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