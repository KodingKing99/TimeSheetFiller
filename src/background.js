console.log("in the background.js file....")
// listen for website url changes
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        console.log("URL CHANGED TO: " + changeInfo.url);
    }
});