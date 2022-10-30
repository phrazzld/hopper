// Remove a URL from storage
function removeURL(url) {
  chrome.storage.sync.get('urls', (data) => {
    let urls = data.urls;
    urls = urls.filter((item) => item !== url);
    chrome.storage.sync.set({ urls });
    // Refresh the list
    populateList();
  });
};

// Populate list of URLs and buttons to remove them
function populateList() {
  chrome.storage.sync.get('urls', (data) => {
    const urls = data.urls;
    const list = document.getElementById('list');
    list.innerHTML = '';
    urls.forEach((url) => {
      const li = document.createElement('li');
      li.innerHTML = url;
      const button = document.createElement('button');
      button.innerHTML = 'Remove';
      button.addEventListener('click', () => {
        removeURL(url);
      });
      li.appendChild(button);
      list.appendChild(li);
    });
  });
};

// Populate the list when the page has loaded
document.addEventListener('DOMContentLoaded', () => {
  populateList();
});
