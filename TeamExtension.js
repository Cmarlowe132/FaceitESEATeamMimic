(() => {
  document.body.style.border = "5px solid red";

  browser.runtime.onMessage.addListener((obj, sender, response) => {
    console.log("HELLO");
    if (obj.playerName != null) {
      displayInfo();
    }
  });

  const displayInfo = async () => {
    const playerRightSideDetails =
      document.getElementsByClassName("col-md-4")[0];
    const teamStatSection = document.createElement("div");
    console.log("here");
    teamStatSection.innerHTML = "Hello";
    playerRightSideDetails.prepend(teamStatSection);
    return true;
  };

  const tempFuntion = async () => {
    document.body.style.border = "5px solid red";
  };
})();
