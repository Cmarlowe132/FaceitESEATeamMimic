const faceitAPIURL = "https://open.faceit.com/data/v4/";
const headerAccept = "application/json";
const headerAuthorization = "Bearer 229b8d49-00be-4d43-8170-f4ee80873973";
let leagueLevel = "";
const leagueOrganizerID = "08b06cfc-74d0-454b-9a51-feda4b6b18da"; //this is the organizer ID of ESEA
let playerTeamID = "";
let playerID = "";

browser.tabs.onUpdated.addListener(async (tabId, tab) => {
  if (tab.url && tab.url.includes("players")) {
    const urlName = tab.url.split("players/")[1];
    if (!urlName.includes("/")) {
      const playerName = urlName;
      console.log(playerName);
      await callAPIs(playerName);
      await sendMessage(tabId, {
        playerName: playerName,
        player_id: playerID,
        league_level: leagueLevel,
      });
    }
  }
});

const sendMessage = async (tabs, obj) => {
  if (playerTeamID == "") {
    setTimeout(() => {
      sendMessage(tabs, obj);
    }, 1000);
  } else {
    browser.tabs.sendMessage(tabs, obj);
  }
};

const callAPIs = async (username) => {
  const response = await fetch(faceitAPIURL + "players?nickname=" + username + "&game=csgo", {
    method: "GET",
    headers: {
      accept: headerAccept,
      Authorization: headerAuthorization,
    },
  });
  const playerAPIValues = await response.json();
  playerID = playerAPIValues.player_id;
  getPlayerMatchHistory();
};

const getPlayerMatchHistory = async () => {
  let keepChecking = true;
  let num = 100;

  while (keepChecking) {
    const response = await fetch(faceitAPIURL + "players/" + playerID + "/history?game=csgo&offset=0&limit=" + num, {
      method: "GET",
      headers: {
        accept: headerAccept,
        Authorization: headerAuthorization,
      },
    });
    const currentMatches = await response.json();

    for (let i = 0; i < currentMatches.items.length; i++) {
      if (
        currentMatches.items[i].competition_type === "championship" &&
        currentMatches.items[i].organizer_id === leagueOrganizerID &&
        !currentMatches.items[i].competition_name.includes("Qualifier")
      ) {
        leagueLevel = currentMatches.items[i].competition_name;

        for (let j = 0; j < currentMatches.items[i].teams.faction1.players.length; j++) {
          if (currentMatches.items[i].teams.faction1.players[j].player_id === playerID) {
            playerTeamID = currentMatches.items[i].teams.faction1.team_id;
            break;
          }
        }

        if (playerTeamID === "") {
          playerTeamID = currentMatches.items[i].teams.faction2.team_id;
        }
        break;
      }
    }
    if (leagueLevel != "" || currentMatches.items.length < 100) {
      keepChecking = false;
    } else {
      num += 100;
    }
  }
  return new Promise(() => {});
};
