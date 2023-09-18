browser.runtime.onMessage.addListener((obj, sender, response) => {
  let name = obj.playerName;
  if (name) {
    displayInfo(name);
  }
});

const displayInfo = (playerName) => {
  if (document.getElementsByClassName("col-md-4").length == 0) {
    setTimeout(() => {
      displayInfo(playerName);
    }, 1000);
  } else {
    const playerRightSideDetails =
      document.getElementsByClassName("col-md-4")[0];
    const teamStatTitle = document.createElement("h3");
    teamStatTitle.innerHTML = "Team Stats";
    const teamStatSection = document.createElement("div");
    teamStatSection.className = "profile__block__content";
    teamStatSection.innerHTML = playerName;

    playerRightSideDetails.prepend(teamStatSection);
    playerRightSideDetails.prepend(teamStatTitle);
  }
};
