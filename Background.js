const faceitAPIURL = "https://open.faceit.com/data/v4/";
const headerAccept = "application/json";
const headerAuthorization = "Bearer 229b8d49-00be-4d43-8170-f4ee80873973";
let playerID = "";

browser.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("players")) {
    const urlName = tab.url.split("players/")[1];
    if (!urlName.includes("/")) {
      const playerName = urlName;
      console.log(callAPIs(playerName));
      console.log(playerName);
      browser.tabs.sendMessage(tabId, {
        playerName: playerName,
      });
    }
  }
});

const callAPIs = async (username) => {
  const response = await fetch(
    faceitAPIURL +
      "search/players?nickname=" +
      username +
      "&game=csgo&offset=0&limit=20",
    {
      method: "GET",
      headers: {
        accept: headerAccept,
        Authorization: headerAuthorization,
      },
    }
  );
  const values = await response.json();
  playerID = values.items[0].player_id;
};
