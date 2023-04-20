// query selectors
var userID = document.querySelector("#user-name");
var userAvatar = document.querySelector("#avatar");
var formSubmitBtn = document.querySelector(".form-submit-btn");
var formNewSubmitBtn = document.querySelector(".form-new-submit-btn");
var playerIcon = document.querySelector(".player-icon");
var playerName = document.querySelector(".player-name");
var playerScore = document.querySelector(".player-score");

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

function modifySubmitBtn() {
  formSubmitBtn.innerText = "Let's rock...paper & scissors!"
  formSubmitBtn.classList.add("form-new-submit-btn")
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