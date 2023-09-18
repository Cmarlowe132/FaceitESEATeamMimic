browser.runtime.onMessage.addListener((obj, sender, response) => {
  if (obj.playerName) {
    console.log(typeof obj.playerName);
    displayInfo(obj.playerName);
  }
});

const displayInfo = (playerName) => {
  if (document.getElementsByClassName("col-md-4").length == 0) {
    setTimeout(() => {
      displayInfo();
    }, 1000);
  } else {
    console.log(playerName);
    const playerRightSideDetails =
      document.getElementsByClassName("col-md-4")[0];
    const teamStatTitle = document.createElement("h3");
    teamStatTitle.innerHTML = "Faceit Team";
    const teamStatSection = document.createElement("div");
    teamStatSection.className = "profile__block__content";
    teamStatSection.innerHTML = playerName;

    playerRightSideDetails.prepend(teamStatSection);
    playerRightSideDetails.prepend(teamStatTitle);
  }
};
