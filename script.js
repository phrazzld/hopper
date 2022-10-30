// In-page cache of saved URLs
const urls = [];

// Initialize URLs from storage
chrome.storage.sync.get("urls", (data) => {
  Object.assign(urls, data.urls);
});

// If current URL is in the list, set button text to "Remove"
// Otherwise, set button text to "Add"
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var currentURL = tabs[0].url;
  if (urls.includes(currentURL)) {
    document.getElementById("add-or-remove").innerHTML = "Remove";
  } else {
    document.getElementById("add-or-remove").innerHTML = "Add";
  }
});

// Clicking button#add-or-remove adds the current URL to the list if it is not already there
// Otherwise it removes the current URL from the list
document.getElementById("add-or-remove").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentURL = tabs[0].url;
    if (urls.includes(currentURL)) {
      urls.splice(urls.indexOf(currentURL), 1);
    } else {
      urls.push(currentURL);
    }

    // Sync changes to URLs to storage
    chrome.storage.sync.set({ urls: urls.filter((url) => !!url) });

    window.close();
  });
});

// Clicking button#hop redirects to a random URL from the list
document.getElementById("hop").addEventListener("click", function () {
  chrome.tabs.update({ url: urls[Math.floor(Math.random() * urls.length)] });

  window.close();
});
