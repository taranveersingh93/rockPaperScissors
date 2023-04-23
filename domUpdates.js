// orchestrating functions

function showGameChoice() {
  renderPlayer(game.players[0], domPlayerIcon, domPlayerName);
  renderScore();
  goToView(gameChoiceView);
  renderTextToElement(game.subHeading, domSubHeading);
}

function showGameBoard() {
  goToView(chooseFighterView);
  showDomElement(gameViewBtn);
  renderTextToElement(game.subHeading, domSubHeading);
  showFighters(game);
}

function showFighters(gameObject) {
  createAllFighterHTML(gameObject);
  renderFighters(gameObject);
}

function goToReveal() {
  goToView(resultView);
  showDomElement(gameViewBtn);
  renderTextToElement(game.subHeading, domSubHeading);
  renderResultPage();
}

function proceedToResult() {
  var domRevealCard = document.querySelector(".result-unknown");
  var domComputerCard = document.querySelector(".comp-card");
  hideDomElement(domRevealCard);
  showDomElement(domComputerCard);
  setTimeout(announceResult, 300);
}

function announceResult() {
  var humanCard = document.querySelector(".human-card");
  var computerCard = document.querySelector(".comp-card");
  renderTextToElement(game.subHeading, domSubHeading);
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

function reloadGameSelection() {
  goToView(gameChoiceView);
  hideDomElement(gameViewBtn);
  renderTextToElement(game.subHeading, domSubHeading);
}

function reloadFighterSelection() {
  clearTimeout(timerID);
  updateReferenceView(game, "chooseFighter");
  showGameBoard();
}

//Solo functions

function renderScore() {
  domPlayerScore.innerText = `Wins: ${game.players[0].wins}`;
  domComputerScore.innerText = `Wins: ${game.players[1].wins}`;
}

function allowSubmit() {
  if (domUserID.value) {
    domSubmitBtn.disabled = false;
    domSubmitBtn.classList.add("submit-btn-alt");
  } else {
    domSubmitBtn.disabled = true;
    domSubmitBtn.classList.remove("submit-btn-alt");
  }
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
    htmlCode += createSingleFighterHTML(gameObject.fighters[i], gameObject);
  }
  return htmlCode;
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
  if (event.target.classList.contains("single-fighter")) {
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