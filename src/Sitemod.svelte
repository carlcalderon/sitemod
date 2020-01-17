<script>
  import { fly } from 'svelte/transition'
  import { fade } from 'svelte/transition'
  import Options from './Options.svelte'

  const SAVE_DEBOUNCE = 10

  let modifiers = []
  let stateChecksum = null
  let options = null
  let showBackButton = false
  let saveTimer = null
  let changed = false
  let saved = false

  async function digest (input) {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)

    const buffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(buffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  }

  async function saveOnChange (change) {
    const newChecksum = await digest(JSON.stringify(change))
    if (stateChecksum && stateChecksum !== newChecksum) {
      changed = true
      clearTimeout(saveTimer)
      saveTimer = setTimeout(() => {
        stateChecksum = newChecksum
        save()
      }, SAVE_DEBOUNCE)
    }
  }

  $: saveOnChange(modifiers)

  function goBack () {
    options.goBack()
  }

  function load() {
    chrome.storage.sync.get({
      modifiers: '[]'
    }, async function(items) {
      modifiers = JSON.parse(items.modifiers)
      stateChecksum = await digest(items.modifiers)
    })
  }

  function save () {
    chrome.storage.sync.set({
      modifiers: JSON.stringify(modifiers)
    }, function() {
      changed = false
      saved = true
      setTimeout(function() {
        saved = false
      }, 750)
    })
  }

  document.addEventListener('DOMContentLoaded', load)
</script>

<style>
  :global(body), :global(html) {
    margin: 0;
    padding: 0;
    width: 400px;
    height: 600px;
    font-family: system-ui, sans-serif;
  }
  :global(body) {
    display: flex;
    flex-direction: column;
    color: #505050;
  }
  :global(button) {
    appearance: none;
    padding: 3px 9px 4px 9px;
    border: 1px solid #c7c7c7;
    border-radius: 2px;
    background: white;
    color: #a0a0a0;
    transition: background 200ms;
  }
  :global(button:hover) {
    background: #eeeeee;
    transition: none;
  }
  :global(button:active), :global(button:focus) {
    outline: 0;
  }

  :global(::-webkit-scrollbar) {
    width: 20px;
    height: 20px;
  }

  :global(::-webkit-scrollbar-track) {
    background: white;
    border: solid 7px white;
  }

  :global(::-webkit-scrollbar-thumb) {
    border: solid 7px white;
    border-radius: 10px;
    background: #c7c7c7;
  }

  header {
    display: flex;
    justify-content: flex-end;
    background: #F2F3F5;
    height: 40px;
    padding-right: 25px;
  }
  .status {
    align-self: center;
    flex: 0;
    margin-right: 25px;
    white-space: nowrap;
  }
  main {
    position: relative;
    flex: 1;
  }
  h1 {
    align-self: center;
    flex: 0;
    margin: 0;
    color: transparent;
    background: transparent center url("../images/sitemod.svg") no-repeat;
  }
  .back-button {
    flex: 0;
    margin-right: auto;
    color: transparent;
    background: transparent center url("../images/arrow-left.svg") no-repeat;
    border: 0;
  }
</style>

<header>
  {#if showBackButton}
    <button class="back-button" out:fly={{x: 25}} in:fly={{x: 25}} on:click={goBack}>
      Back
    </button>
  {/if}
  {#if saved}
    <div class="status" out:fade>All changes saved!</div>
  {:else if changed}
    <div class="status">Detected changes, saving...</div>
  {/if}
  <h1>sitemod</h1>
</header>
<main>
  <Options
    bind:modifiers
    bind:this={options}
    bind:showBackButton={showBackButton}
  />
</main>
