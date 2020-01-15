<script>
  import Options from './Options.svelte'
  let activeMods = []
  let url = null

  chrome.tabs.getSelected(null, tab => {
    url = tab.url
  })

  $: {
    chrome.storage.sync.get({
      modifiers: '[]',
    }, function(items) {
      activeMods = JSON.parse(items.modifiers).filter(mod => (
        new RegExp(mod.pattern).test(url)
      ))
    })
  }

  $: {
    applyIcon(activeMods.length > 0)
  }

  function applyIcon (active) {
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
    chrome.browserAction.setIcon({imageData:context.getImageData(0, 0, 24, 24)});
  }

  applyIcon(false)

</script>

<h1>sitemod</h1>
<p>Active mods: {activeMods.length}</p>
<Options></Options>