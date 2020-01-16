<script>
  import { fly } from 'svelte/transition'
  import ModEditor from './components/ModEditor.svelte'

  export let save = null
  export let showBackButton = false
  export let modifiers = []
  let saved = false
  let selectedIndex = null

  export function goBack () {
    selectedIndex = null
    showBackButton = false
  }

  function showDetails (index) {
    selectedIndex = index
    showBackButton = true
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
  }

  .hitarea {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  section {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
  }

  .details {
    padding: 15px;
  }
  h2 {
    margin-top: 0px;
  }
</style>
{#if selectedIndex === null}
  <section out:fly={{x: -100}} in:fly={{x: -100}}>

    {#each modifiers as mod, index}
      <div class="modifier">
        <input class="enabled " type="checkbox" bind:checked={mod.enabled} />
        <div class="name">{mod.name}</div>
        <aside class="actions">
          <button on:click={() => removeModAt(index)}>Remove</button>
        </aside>
        <div class="arrow">&gt;</div>
        <div class="hitarea" on:click={() => showDetails(index)} />
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
