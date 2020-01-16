<script>
  import { fly } from 'svelte/transition'
  import Options from './Options.svelte'

  let options = null
  let showBackButton = false

  function goBack () {
    options.goBack()
  }

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
  }
  header {
    display: flex;
    justify-content: flex-end;
    background: grey;
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
  <Options bind:this={options} bind:showBackButton={showBackButton}></Options>
</main>
