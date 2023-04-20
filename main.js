// query selectors
var userID = document.querySelector("#user-name");
var formSubmitBtn = document.querySelector(".form-submit-btn")

// event listeners
userID.addEventListener("keyup", allowSubmit);

// functions 
function allowSubmit() {
  if(userID.value) {
    formSubmitBtn.disabled = false;
  } else {
    formSubmitBtn.disabled = true;
  }
}