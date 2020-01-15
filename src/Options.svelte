<script>
  export let modifiers = []
  let saved = false

  function restore_options() {
    console.log('options restored!')
    chrome.storage.sync.get({
      modifiers: JSON.stringify([
    {
      name: 'Twitch - Picture in picture',
      pattern: 'twitch\\.com',
      scripts: ['console.log(\'twitch pattern matched!\')'],
      styles: ['video { z-index: 999 }']
    },
    {
      name: 'YouTube - Full width',
      pattern: 'youtube\\.com',
      scripts: ['console.log(\'youtube pattern matched!\')'],
      styles: ['body { background-color: red }']
    },
    {
      name: 'Google',
      pattern: 'google\\.com',
      scripts: ['console.log(\'google pattern matched!\')'],
      styles: ['body { background-color: red }']
    }
  ]),
    }, function(items) {
      modifiers = JSON.parse(items.modifiers)
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options)

  function save () {
    console.log('save')

    chrome.storage.sync.set({
      modifiers: JSON.stringify(modifiers)
    }, function() {
      // Update status to let user know options were saved.
      saved = true
      setTimeout(function() {
        saved = false
      }, 750);
    });
  }

  function addMod () {
    modifiers = [...modifiers, {
      name: 'New mod',
      pattern: 'example\\.com',
      scripts: ['console.log(\'new mod script\')'],
      styles: ['body { background: violet }']
    }]
  }

  function removeModAt (index) {
    modifiers = [...modifiers.slice(0, index), ...modifiers.slice(index + 1)]
  }

</script>

<table>
  <thead>
    <tr>
      <td>Name</td>
      <td>URL pattern (RegExp)</td>
      <td>Scripts</td>
      <td>Styles</td>
      <td>Actions</td>
    </tr>
  </thead>
  <tbody>
    {#each modifiers as mod, index}
      <tr>
        <td>{mod.name}</td>
        <td><pre contenteditable="true" bind:innerHTML={mod.pattern}>{mod.pattern}</pre></td>
        <td>
          {#each mod.scripts as script}
            <textarea bind:value={script}></textarea>
          {/each}
        </td>
        <td>
          {#each mod.styles as style}
            <pre contenteditable="true" bind:innerHTML={style}>{style}</pre>
          {/each}
        </td>
        <td>
          <button on:click={() => removeModAt(index)}>Remove</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<button on:click={addMod}>+</button>
<button on:click={save}>Save</button>
{#if saved}
  <p>Saved!</p>
{/if}
