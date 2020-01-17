function applyIcon (active, tabId) {
  chrome.browserAction.setIcon({
    path: {
      "16": `images/sitemod_icon_${active ? 'active' : 'idle'}_16.png`,
      "24": `images/sitemod_icon_${active ? 'active' : 'idle'}_24.png`,
      "32": `images/sitemod_icon_${active ? 'active' : 'idle'}_32.png`,
      "64": `images/sitemod_icon_${active ? 'active' : 'idle'}_64.png`,
      "128": `images/sitemod_icon_${active ? 'active' : 'idle'}_128.png`
    },
    tabId
  });
}

chrome.runtime.onMessage.addListener(function (message, options) {
  if (message.action === 'updateIcon') {
    applyIcon(message.value, options.tab.id)
  }
})
