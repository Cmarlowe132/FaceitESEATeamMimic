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
    }, 3000);
  } else {
    console.log(document.getElementsByClassName("col-md-4")[0]);
    const playerRightSideDetails =
      document.getElementsByClassName("col-md-4")[0];
    const teamStatSection = document.createElement("div");
    teamStatSection.innerHTML = "Hello";
    playerRightSideDetails.prepend(teamStatSection);
  }
};

document.body.style.border = "5px solid red";
displayInfo();
