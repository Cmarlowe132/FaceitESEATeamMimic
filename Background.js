browser.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("players")) {
    const urlName = tab.url.split("players/")[1];
    if (!urlName.includes("/")) {
      const playerName = urlName;
      console.log(playerName);
      browser.tabs.sendMessage(tabId, {
        playerName: playerName,
      });
    }
  }
});

const callAPIs = async (username) => {};

//229b8d49-00be-4d43-8170-f4ee80873973 faceit api key
