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
  const padding = 3
  const thickness = 3
  const width = 24
  const height = 24
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  context.fillStyle = '#fbfbfb'
  context.fillRect(padding, padding, width-padding*2, thickness)
  context.fillRect(width - padding - thickness, padding, thickness, height - padding * 2)
  context.fillRect(padding, height - padding - thickness, width-padding*2, thickness)
  context.fillRect(padding, padding, thickness, height - padding * 2)
  if (active) {
    context.fillStyle = '#f09'
    context.fillRect(padding + thickness, padding + thickness, width - padding * 2 - thickness * 2, height - padding * 2 - thickness * 2)
  }
  chrome.browserAction.setIcon({imageData:context.getImageData(0, 0, 24, 24), tabId});
}

chrome.storage.onChanged.addListener(function () {
  cleanup()
  initialize()
})
applyIcon(false, null)
initialize()
