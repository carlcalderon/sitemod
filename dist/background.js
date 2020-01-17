let patterns = []
let activeMod = false

function cleanup () {
  chrome.tabs.onActivated.removeListener(handleTabChange)
}

function handleTabChange (info) {
  chrome.tabs.get(info.tabId, function(change) {
    activeMod = patterns.some(pattern => change.url.match(pattern))
    applyIcon(activeMod, info.tabId)
  })
}

function initialize () {
  chrome.storage.sync.get({
    modifiers: '[]',
  }, function(items) {
    patterns = JSON.parse(items.modifiers).map(mod => (
      new RegExp(mod.pattern)
    ))
    chrome.tabs.onActivated.addListener(handleTabChange)
  })
}

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

chrome.storage.onChanged.addListener(function () {
  cleanup()
  initialize()
})
initialize()
