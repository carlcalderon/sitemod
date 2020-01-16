<script>
  import { fly } from 'svelte/transition'
  import Options from './Options.svelte'

  let modifiers = []
  let options = null
  let showBackButton = false

  function goBack () {
    options.goBack()
  }

  function load() {
    chrome.storage.sync.get({
      modifiers: '[]',
    }, function(items) {
      modifiers = JSON.parse(items.modifiers)
    })
  }


  function save () {
    chrome.storage.sync.set({
      modifiers: JSON.stringify(modifiers)
    }, function() {
      // Update status to let user know options were saved.
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
  header {
    display: flex;
    justify-content: flex-end;
    background: #F2F3F5;
    padding: 15px;
  }
  main {
    position: relative;
    flex: 1;
  }
  h1 {
    text-align: right;
    flex: 1;
    margin: 0;
  }
  button {
    flex: 0;
  }
</style>

<header>
  {#if showBackButton}
    <button out:fly={{x: 25}} in:fly={{x: 25}} on:click={goBack}>Back</button>
  {/if}
  <h1>sitemod</h1>
</header>
<main>
  <Options
    bind:save
    bind:modifiers
    bind:this={options}
    bind:showBackButton={showBackButton}
  />
</main>
