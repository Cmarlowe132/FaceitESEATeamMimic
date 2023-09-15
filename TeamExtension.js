browser.runtime.onMessage.addListener((obj, sender, response) => {
  console.log("HELLO");
  if (obj.playerName != null) {
    displayInfo();
  }
});

const displayInfo = async () => {
  const playerRightSideDetails = document.getElementsByClassName("col-md-4")[0];
  const teamStatSection = document.createElement("div");
  teamStatSection.innerHTML = "Hello";
  playerRightSideDetails.prepend(teamStatSection);
  console.log("I have made it here");
};

const tempFuntion = async () => {
  document.body.style.border = "5px solid red";
};

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("im gonna blow my head off");
});
document.body.style.border = "5px solid red";
console.log("Help me Please");
displayInfo();
