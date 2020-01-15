chrome.storage.sync.get({
  modifiers: '[]',
}, function(items) {
  const modifiers = JSON.parse(items.modifiers)

  let active = false
  modifiers.forEach(function (mod) {
    if (new RegExp(mod.pattern).test(window.location.href)) {
      active = true
      mod.scripts.forEach(function (script) {
        const scriptTag = document.createElement('script')
        scriptTag.innerHTML = script
        document.body.appendChild(scriptTag)
      })
      mod.styles.forEach(function (style) {
        const styleTag = document.createElement('style')
        styleTag.innerHTML = style
        document.body.appendChild(styleTag)
      })
    }
  })

  chrome.runtime.sendMessage({
    action: 'updateIcon',
    value: active
  })
})

