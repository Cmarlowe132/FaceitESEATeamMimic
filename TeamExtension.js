browser.runtime.onMessage.addListener((obj, sender, response) => {
  console.log("HELLO");
  if (obj.playerName != null) {
    displayInfo();
  }
});

const displayInfo = () => {
  if (document.getElementsByClassName("col-md-4").length == 0) {
    setTimeout(() => {
      displayInfo();
    }, 1000);
  } else {
    console.log(document.getElementsByClassName("col-md-4")[0]);
    const playerRightSideDetails =
      document.getElementsByClassName("col-md-4")[0];
    const teamStatTitle = document.createElement("h3");
    teamStatTitle.innerHTML = "Faceit Team";
    const teamStatSection = document.createElement("div");
    teamStatSection.className = "profile__block__content";
    teamStatSection.innerHTML = "Hello";

    playerRightSideDetails.prepend(teamStatSection);
    playerRightSideDetails.prepend(teamStatTitle);
  }
};

displayInfo();
