// query selectors
var userID = document.querySelector("#user-name");
var userAvatar = document.querySelector("#avatar");
var formSubmitBtn = document.querySelector(".form-submit-btn")

var computerPlayer = {
  name: "Computer",
  avatar: "&#x1F4BB;",
  wins: 0
};
var humanPlayer = {};

// event listeners
userID.addEventListener("keyup", allowSubmit);
formSubmitBtn.addEventListener("click", function() {
  createPlayer(humanPlayer);
});

// functions 
function allowSubmit() {
  if(userID.value) {
    formSubmitBtn.disabled = false;
  } else {
    formSubmitBtn.disabled = true;
  }
}

function createPlayer(playerObject) {
  var proxyPlayer = {...playerObject};
  var label = userID.value;
  var icon = userAvatar.value;
  proxyPlayer.name = label;
  proxyPlayer.avatar = icon;
  playerObject = proxyPlayer;
  return playerObject;
}

