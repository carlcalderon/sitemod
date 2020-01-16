<script>
  import { fly } from 'svelte/transition'
  import ModEditor from './components/ModEditor.svelte'

  export let modifiers = []
  let saved = false
  let selectedIndex = null

  function restore_options() {
    console.log('options restored!')
    chrome.storage.sync.get({
      modifiers: JSON.stringify([
    {
      name: 'Twitch - Picture in picture',
      pattern: 'twitch\\.tv',
      scripts: ['console.log(\'twitch pattern matched!\')'],
      styles: ['video { z-index: 999 }'],
      enabled: true
    },
    {
      name: 'YouTube - Full width',
      pattern: 'youtube\\.com',
      scripts: ['console.log(\'youtube pattern matched!\')'],
      styles: ['body { background-color: red }'],
      enabled: true
    },
    {
      name: 'Google',
      pattern: 'google\\.com',
      scripts: ['console.log(\'google pattern matched!\')'],
      styles: ['body { background-color: red }'],
      enabled: false
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
      scripts: ['console.log(\'new sitemod script\')'],
      styles: ['body { background: violet }'],
      enabled: true
    }]
  }

  function removeModAt (index) {
    modifiers = [...modifiers.slice(0, index), ...modifiers.slice(index + 1)]
  }

</script>

<style>
  .modifier {
    height: 40px;
    border-bottom: 1px solid grey;
    position: relative;
  }

  aside {
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px 0px;
  }

  .name {
    padding: 12px 0px;
  }

  section {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
{#if selectedIndex === null}
  <section out:fly={{x: -100}} in:fly={{x: -100}}>

    {#each modifiers as mod, index}
      <div class="modifier">
        <div class="name" on:click={() => selectedIndex = index}>{mod.name}</div>
        <aside>
          <input type="checkbox" bind:checked={mod.enabled} />
          <button on:click={() => removeModAt(index)}>Remove</button>
        </aside>
      </div>
    {/each}

    <button on:click={addMod}>+</button>
    <button on:click={save}>Save</button>
    {#if saved}
      <p>Saved!</p>
    {/if}
  </section>
{:else}
  <section out:fly={{x: 100}} in:fly={{x: 100}} class="details">
    <button on:click={() => selectedIndex = null}>Back</button>
    <h2>{modifiers[selectedIndex].name}</h2>
    <ModEditor
      bind:name={modifiers[selectedIndex].name}
      bind:pattern={modifiers[selectedIndex].pattern}
      bind:scripts={modifiers[selectedIndex].scripts}
      bind:styles={modifiers[selectedIndex].styles}
      bind:enabled={modifiers[selectedIndex].enabled}
    />
  </section>
{/if}
