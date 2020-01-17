<script>
  import { fly } from 'svelte/transition'
  import ModEditor from './components/ModEditor.svelte'
  import ModToggle from './components/ModToggle.svelte'

  export let showBackButton = false
  export let modifiers = []
  let selectedIndex = null
  let selectedMod = null

  export function goBack () {
    selectedIndex = null
    showBackButton = false
  }

  function showDetails (mod, index) {
    selectedMod = {
      name: mod.name,
      pattern: mod.pattern,
      scripts: [...mod.scripts],
      styles: [...mod.styles],
      enabled: mod.enabled
    }
    selectedIndex = index
    showBackButton = true
  }

  function updateModAtIndex (index, data) {
    modifiers[index].name = data.name
    modifiers[index].pattern = data.pattern
    modifiers[index].scripts = data.scripts
    modifiers[index].styles = data.styles
  }

  function addMod () {
    modifiers = [...modifiers, {
      name: 'My sitemod',
      pattern: 'example\\.com',
      scripts: ['/* Add JavaScript here */\nconsole.log(\'my sitemod script\')'],
      styles: ['/* Add CSS here */'],
      enabled: true
    }]
  }

  function removeModAt (index) {
    if (window.confirm(`Are you sure you want to remove the sitemod "${modifiers[index].name}"? This can not be undone.`)) {
      modifiers = [...modifiers.slice(0, index), ...modifiers.slice(index + 1)]
    }
  }

</script>

<style>
  .modifier {
    height: 65px;
    border-bottom: 6px solid #F2F3F5;
    position: relative;
    padding: 0px 25px;
    display: flex;
    flex-direction: row;
  }

  .enabled {
    flex: 0;
    align-self: center;
    margin-right: 25px;
    z-index: 2;
  }

  .name {
    font-weight: bold;
    font-size: 1.1em;
    flex: 1;
    align-self: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .actions {
    flex: 0;
    align-self: center;
    margin-left: 25px;
    z-index: 2;
  }

  .arrow {
    flex: 0;
    align-self: center;
    margin-left: 25px;
    color: transparent;
    background: transparent center url("../images/arrow-right.svg") no-repeat;
  }

  .hitarea {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .add-button {
    display: block;
    margin: 25px auto;
  }

  section {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .scrollable {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .details {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .editor {
    padding: 20px;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 6px solid #F2F3F5;
  }
  h2 {
    flex: 1;
    margin: 0px;
    align-self: center;
  }
  .save-button {
    flex: 0;
    align-self: center;
  }
</style>
{#if selectedIndex === null}
  <section out:fly={{x: -100}} in:fly={{x: -100}} class="scrollable">
    {#each modifiers as mod, index}
      <div class="modifier">
        <div class="enabled">
          <ModToggle bind:active={mod.enabled} />
        </div>
        <div class="name">{mod.name}</div>
        <aside class="actions">
          <button on:click={() => removeModAt(index)}>Remove</button>
        </aside>
        <div class="arrow">Edit</div>
        <div class="hitarea" on:click={() => showDetails(mod, index)} />
      </div>
    {/each}

    <button class="add-button" on:click={addMod}>Add sitemod</button>
  </section>
{:else}
  <section out:fly={{x: 100}} in:fly={{x: 100}} class="details">
    <header>
      <h2>{selectedMod.name}</h2>
      <button
        class="save-button"
        on:click={() => updateModAtIndex(selectedIndex, selectedMod)}
      >
        Save
      </button>
    </header>
    <div class="editor scrollable">
      <ModEditor
        bind:name={selectedMod.name}
        bind:pattern={selectedMod.pattern}
        bind:scripts={selectedMod.scripts}
        bind:styles={selectedMod.styles}
      />
    </div>
  </section>
{/if}
