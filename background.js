chrome.webRequest.onCompleted.addListener(
	function() {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {})
		})
	}, {urls: ["https://twitter.com/*"]})