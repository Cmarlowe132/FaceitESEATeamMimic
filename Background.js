//import axios from "axios";

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
