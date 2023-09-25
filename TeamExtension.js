let leagueLevel = "";

browser.runtime.onMessage.addListener((obj, sender, response) => {
  let name = obj.playerName;
  console.log(obj.league_level);
  leagueLevel = obj.league_level;
  if (name) {
    displayInfo(name);
  }
});

//Takes in a user's username and will display their team stats on the faceit stats page
const displayInfo = (playerName) => {
  //Wait until the page has loaded the content fully and this section can be grabbed
  if (!document.getElementById("content-grid-element-5")) {
    setTimeout(() => {
      displayInfo(playerName);
    }, 1000);
  } else {
    if (document.getElementById("team-stat-section")) {
      //updateInfo();
      return;
    }
    const playerRightSideDetails = document.getElementById("content-grid-element-5");
    const newSection = generateHTML();
    playerRightSideDetails.prepend(newSection);
  }
};

const updateInfo = () => {};

const setPlayerLeagueImage = (leagueName) => {
  switch (leagueName) {
    case "Challenger":
      return browser.runtime.getURL("Assets/Challenger.png");
    case "Advanced":
      return browser.runtime.getURL("Assets/Advanced.png");
    case "Main":
      return browser.runtime.getURL("Assets/Main.png");
    case "Intermediate":
      return browser.runtime.getURL("Assets/Intermediate.png");
    case "Open":
      return browser.runtime.getURL("Assets/Open.png");
    default:
      return browser.runtime.getURL("Assets/Open.png");
  }
};

const generateHTML = () => {
  leagueLevel = getLeagueName(leagueLevel);
  //Generates the div where the league image and win will be
  const newSection = document.createElement("div");
  newSection.id = "team-stat-section";

  //Generates Header to designate section using Faceit's styling
  const teamStatTitle = document.createElement("header");
  teamStatTitle.className = "sc-fLoazL iBGUjh";
  const titleLeague = document.createElement("h5");
  titleLeague.className = "sc-kgvGAC jJDCMI";
  titleLeague.innerText = "League";
  teamStatTitle.appendChild(titleLeague);

  //Creates section that will contain the league image, wins, and team name
  const teamStatSection = document.createElement("div");
  teamStatSection.className = "team-stat-section";

  const teamStatSectionTitle = document.createElement("div");
  teamStatSectionTitle.className = "league-title";
  teamStatSectionTitle.innerHTML = leagueLevel;
  teamStatSection.appendChild(teamStatSectionTitle);

  const leagueWordDiv = document.createElement("div");
  leagueWordDiv.className = "league-text";
  leagueWordDiv.innerHTML = "League";
  teamStatSection.appendChild(leagueWordDiv);

  const recordDiv = document.createElement("div");
  recordDiv.className = "record";
  recordDiv.innerHTML = "0-0-0";
  teamStatSection.appendChild(recordDiv);

  const leagueImage = document.createElement("img");
  leagueImage.src = setPlayerLeagueImage(leagueLevel);
  teamStatSection.appendChild(leagueImage);

  newSection.prepend(teamStatSection);
  newSection.prepend(teamStatTitle);
  return newSection;
};

const getLeagueName = (leagueName) => {
  if (leagueName.includes("Open")) {
    return "Open";
  } else {
    if (leagueName.includes("IM")) {
      return "Intermediate";
    } else {
      if (leagueName.includes("Main")) {
        return "Main";
      } else {
        if (leagueName.includes("Advanced")) {
          return "Advanced";
        } else {
          if (leagueName.includes("ECL")) {
            return "Challenger";
          } else {
            return "Oh no";
          }
        }
      }
    }
  }
};
