browser.tabs.onUpdated.addListener((tabId, tab) => {
  console.log("yo");
  if (tab.url && tab.url.includes("players")) {
    const urlName = tab.url.split("players/")[1];
    const playerName = urlName.indexOf("/");
    console.log("yo");
    browser.runtime.sendMessage(tabId, {
      playerName: playerName,
    });
  }
});
