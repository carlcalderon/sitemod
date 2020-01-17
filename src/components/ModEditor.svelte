<script>
  import CodeEditor from './CodeEditor.svelte'
  export let name
  export let pattern
  export let scripts = []
  export let styles = []

</script>
<style>
  label {
    font-weight: bold;
    margin: 10px auto 5px auto;
    display: block;
  }

  label:first-of-type {
    margin-top: 0px;
  }

  input {
    display: block;
    border: 1px solid #c7c7c7;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 15px;
  }

</style>

<label>Name</label>
<input type="text" bind:value={name} placeholder="My sitemod" />

<label>Pattern (Regular Expression)</label>
<input type="text" bind:value={pattern} placeholder="example\.com" />

<label>Script</label>
{#each scripts as script}
  <CodeEditor language='javascript' bind:value={script}></CodeEditor>
{/each}

<label>Style</label>
{#each styles as style}
  <CodeEditor language='css' bind:value={style}></CodeEditor>
{/each}
