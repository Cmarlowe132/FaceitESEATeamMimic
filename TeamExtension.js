(() => {
  const displayInfo = () => {
    const playerRightSideDetails =
      document.getElementsByClassName("col-md-4")[0];
    const teamStatSection = document.createElement("div");
    teamStatSection.innerHTML = "Hello";
    playerRightSideDetails.prepend(teamStatSection);
  };

  browser.runtime.onMessage.addListener((obj, sender) => {
    if (obj.playerName != null) {
      displayInfo();
    }
  });
})();
