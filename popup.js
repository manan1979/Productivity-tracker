document.addEventListener("DOMContentLoaded", function() {
    // Retrieve productivity report from storage
    chrome.storage.local.get("productivityReport", function(result) {
      const report = result.productivityReport || {};
      const reportDiv = document.getElementById("report");
  
      // Display the report on the popup page
      for (const site in report) {
        const timeSpent = report[site];
        const siteDiv = document.createElement("div");
        siteDiv.innerText = `${site}: ${timeSpent} minutes`;
        reportDiv.appendChild(siteDiv);
      }
    });
  
    // Handle block button click
    const blockButton = document.getElementById("blockButton");
    blockButton.addEventListener("click", function() {
      // Perform website blocking logic
      // ...
  
      // Notify the background script to update the block list
      chrome.runtime.sendMessage({ action: "updateBlockList", site: "example.com" });
    });
  });
  