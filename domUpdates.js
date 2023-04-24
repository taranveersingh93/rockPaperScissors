function allowSubmit() {
  if (userID.value) {
    submitBtn.disabled = false;
    submitBtn.classList.add("submit-btn-alt");
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove("submit-btn-alt");
  }
}

function showGameChoice() {
  renderPlayer(game.players[0], playerIcon, playerName);
  renderScore();
  goToView(gameChoiceView);
  renderTextToElement(game.subHeading, subHeading);
}

function showRules(event) {
  var classicRulesDiv = classicContainer.querySelector(".game-rules");
  var difficultRulesDiv = difficultContainer.querySelector(".game-rules");

  if (event.target.closest(".game-card")?.classList.contains("classic-container")) {
    var rules = classicRulesDiv.querySelectorAll("h4");
    classicRulesDiv.classList.add("visible-classic");
    for (var i = 0; i < rules.length; i++) {
      rules[i].classList.add("visible");
    }
  } else if (event.target.closest(".game-card")?.classList.contains("difficult-container")) {
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

  if (event.target.closest(".game-card")?.classList.contains("classic-container")) {
    var rules = classicRulesDiv.querySelectorAll("h4");
    for (var i = 0; i < rules.length; i++) {
      classicRulesDiv.querySelector("h4").classList.remove("visible");
    }
    classicRulesDiv.classList.remove("visible-classic");
  } 

  if (event.target.closest(".game-card")?.classList.contains("difficult-container")) {
    var rules = difficultRulesDiv.querySelectorAll("h4");
    for (var i = 0; i < rules.length; i++) {
      difficultRulesDiv.querySelector("h4").classList.remove("visible");
    }
    difficultRulesDiv.classList.remove("visible-difficult");
  } 
}

function renderPlayer(playerObject, domIcon, domName) {
  domIcon.innerText = playerObject.avatar;
  domName.innerText = playerObject.name;
}

function renderScore() {
  playerScore.innerText = `Wins: ${game.players[0].wins}`;
  computerScore.innerText = `Wins: ${game.players[1].wins}`;
}

function showGameBoard() {
  goToView(chooseFighterView);
  showDomElement(gameViewBtn);
  renderTextToElement(game.subHeading, subHeading);
  showFighters(game);
}

function showFighters(gameObject) {
  createAllFighterHTML(gameObject);
  renderFighters(gameObject);
}

function renderFighters(gameObject) {
  allFighters.innerHTML = createAllFighterHTML(gameObject);
}

function createAllFighterHTML(gameObject) {
  var htmlCode = "";
  for (var i = 0; i < gameObject.fighters.length; i++) {
    htmlCode += createSingleFighterHTML(gameObject.fighters[i], gameObject);
  }
  return htmlCode;
}

function createSingleFighterHTML(fighter, gameObject) {
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
    <img class="beat-fighter" src="assets/${gameObject.logic[fighter][i]}.png" alt="${gameObject.logic[fighter][i]} icon">
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

function showBeatCard(event) {
  if (event.target.classList.contains("single-fighter")) {
    var parentID = event.target.id;
    var cardID = `${parentID}-beat-card`;
    var targetCard = document.querySelector("#"+cardID);
    targetCard.classList.add("show");
  }
}

function hideBeatCard(event) {
  if (event.target.classList.contains("single-fighter")) {
    var parentID = event.target.id;
    var cardID = `${parentID}-beat-card`;
    var targetCard = document.querySelector("#"+cardID);
    targetCard.classList.remove("show");
  }
}

function goToReveal() {
  goToView(resultView);
  showDomElement(gameViewBtn);
  renderTextToElement(game.subHeading, subHeading);
  renderResultPage();
}

function renderResultPage() {
  resultViewFighters.innerHTML = createShowdownHTML(game);
}

function createShowdownHTML(gameObject) {
  var htmlCode = 
  `
  <div class="result-card human-card">
    <img class="result-single-fighter" src="assets/${gameObject.players[0].choice}.png" alt="${gameObject.players[0].choice} card">
  </div>
  <div class="result-unknown">
    Click to reveal
  </div>
  <div class="result-card comp-card hidden">
    <img class="result-single-fighter" src="assets/${gameObject.players[1].choice}.png" alt="${gameObject.players[1].choice} card">
  </div>
  `;
  return htmlCode;
}

function proceedToResult() {
  var revealCard = document.querySelector(".result-unknown");
  var computerCard = document.querySelector(".comp-card");
  hideDomElement(revealCard);
  showDomElement(computerCard);
  setTimeout(announceResult, 300);
}

function announceResult() {
  var humanCard = document.querySelector(".human-card");
  var computerCard = document.querySelector(".comp-card");
  renderTextToElement(game.subHeading, subHeading);
  if (game.lastResult === "draw") {
    animateDraw(humanCard, computerCard);
  } else if (game.lastResult === "win") {
    animateWin(humanCard, computerCard);
  } else {
    animateLoss(humanCard, computerCard);
  }
  renderScore();
  timerID = setTimeout(reloadFighterSelection, 4000);
}

function animateDraw(userCard, compCard) {
  userCard.classList.add("loser");
  compCard.classList.add("loser");
}

function animateWin(userCard, compCard) {
  userCard.classList.add("winner");
  compCard.classList.add("loser");
}

function animateLoss(userCard, compCard) {
  userCard.classList.add("loser");
  compCard.classList.add("winner");
}

function reloadGameSelection() {
  clearTimeout(timerID);
  goToView(gameChoiceView);
  hideDomElement(gameViewBtn);
  renderTextToElement(game.subHeading, subHeading);
}

function reloadFighterSelection() {
  clearTimeout(timerID);
  updateReferenceView(game, "chooseFighter");
  showGameBoard();
}

// helper functions

function renderTextToElement(variable, dom) {
  dom.innerText = variable;
}

function hideDomElement(element) {
  element.classList.add("hidden");
}

function showDomElement(element) {
  element.classList.remove("hidden");
}

function goToView(toView) {
  hideDomElement(userInputView);
  hideDomElement(gameChoiceView);
  hideDomElement(chooseFighterView);
  hideDomElement(resultView);
  showDomElement(toView);
}