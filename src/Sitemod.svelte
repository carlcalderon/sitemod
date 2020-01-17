<script>
  import { fly } from 'svelte/transition'
  import { blur } from 'svelte/transition'
  import Options from './Options.svelte'

  const SAVE_DEBOUNCE = 1000

  let modifiers = []
  let stateChecksum = null
  let options = null
  let showBackButton = false
  let saveTimer = null
  let saved = false

  async function digest (input) {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)

    const buffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(buffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  }

  function saveOnChange (change) {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(async () => {
      if (stateChecksum) {
        const newChecksum = await digest(JSON.stringify(change))
        if (stateChecksum !== newChecksum) {
          stateChecksum = newChecksum
          save()
        }
      }
    }, SAVE_DEBOUNCE)
  }

  $: saveOnChange(modifiers)

  function goBack () {
    options.goBack()
  }

  function load() {
    chrome.storage.sync.get({
      modifiers: JSON.stringify([
        {
          name: 'Twitch.tv - Picture in Picture',
          scripts: ['function injectPiPButton (document) {\n  // Get button container\n  var buttonGroup = document.querySelector(".player-controls__right-control-group")\n\n  // Clone an existing button\n  var pipButton = document.querySelector(".player-controls__right-control-group div").cloneNode(true)\n\n  // Modify our button visuals\n  var icon = pipButton.querySelector("svg")\n  icon.setAttribute("viewBox", "0 0 24 24")\n  icon.innerHTML = "<path d=\"M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z\"/>"\n  pipButton.querySelector(".tw-tooltip").innerHTML = "Picture in Picture"\n\n  // Attach events\n  pipButton.addEventListener("click", function () {\n    document.querySelector(".video-player video")\n      .requestPictureInPicture()\n  })\n\n  // Add PiP button\n  buttonGroup.appendChild(pipButton)\n}\n\n// Activate when things should be available\nsetTimeout(function () { injectPiPButton(document) }, 1000)'],
          styles: [''],
          enabled: true
        }
      ]),
    }, async function(items) {
      modifiers = JSON.parse(items.modifiers)
      stateChecksum = await digest(items.modifiers)
    })
  }

  function save () {
    chrome.storage.sync.set({
      modifiers: JSON.stringify(modifiers)
    }, function() {
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
  }

  :global(::-webkit-scrollbar-track) {
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
  .saved {
    align-self: center;
    flex: 0;
    margin-right: 25px;
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
  button {
    flex: 0;
    margin-right: auto;
  }
</style>

<header>
  {#if showBackButton}
    <button out:fly={{x: 25}} in:fly={{x: 25}} on:click={goBack}>Back</button>
  {/if}
  {#if saved}
    <div class="saved" out:blur>Saved</div>
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
