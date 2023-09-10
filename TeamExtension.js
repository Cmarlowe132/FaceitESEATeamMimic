(() => {
  if (document.getElementsByClassName("col-md-4")[0] !== null) {
    const playerRightSideDetails =
      document.getElementsByClassName("col-md-4")[0];
    const teamStatSection = document.createElement("div");
    teamStatSection.className();
    playerRightSideDetails.prepend(teamStatSection);
  }
})();
