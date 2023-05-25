// Initialize the productivity report
chrome.storage.local.get("productivityReport", function(result) {
    const report = result.productivityReport || {};
    chrome.storage.local.set({ productivityReport: report });
  });
  
  // Listen for tab update events
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.active) {
      const url = new URL(tab.url);
      const site = url.hostname;
      const timeSpent = 1; // Increment time spent on the site (you can customize this)
  
      // Update the productivity report
      chrome.storage.local.get("productivityReport", function(result) {
        const report = result.productivityReport || {};
        report[site] = (report[site] || 0) + timeSpent;
        chrome.storage.local.set({ productivityReport: report });
      });
    }
  });
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateBlockList") {
      const site = request.site;
  
      // Perform website blocking logic
      // ...
  
      // Notify the popup that the block list is updated
      chrome.runtime.sendMessage({ action: "blockListUpdated" });
    }
  });
  