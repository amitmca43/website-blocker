var redirect = '';
var websites = [];
chrome.runtime.onInstalled.addListener(function() {});

chrome.storage.local.get('data', function(store) {
	if (!store.data) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				store.data = JSON.parse(xhr.responseText);
			}
		};
		xhr.open('GET', chrome.extension.getURL('init.json'), false);
		xhr.send();
	}
	websites = store.data.websites;
	redirect = store.data.redirect;
});

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
	console.log(websites);
	console.log(redirect);
	if (websites.find(url => details.url.includes(url))) {
		chrome.tabs.update(details.tabId, {
			url: redirect
		});
	}
});
