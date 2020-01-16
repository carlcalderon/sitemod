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
    modifiers = [...modifiers.slice(0, index), ...modifiers.slice(index + 1)]
  }

</script>

<style>
  .modifier {
    height: 65px;
    border-bottom: 6px solid #F2F3F5;
    position: relative;
    padding: 0px 25px;
  }

  aside {
    position: absolute;
    right: 25px;
    top: 0;
    padding: 25px 0px;
  }

  .name {
    padding: 25px 0px;
    font-weight: bold;
    font-size: 1.1em;
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
        <div class="name" on:click={() => showDetails(index)}>{mod.name}</div>
        <aside>
          <button on:click={() => removeModAt(index)}>Remove</button>
          <input type="checkbox" bind:checked={mod.enabled} />
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
