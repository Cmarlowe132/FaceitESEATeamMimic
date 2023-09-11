browser.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("players")) {
    const urlName = tab.url.split("players/")[1];
    const playerName = urlName.indexOf("/");

    browser.runtime.sendMessage(tabId, {
      playerName: playerName,
    });
  }
});
