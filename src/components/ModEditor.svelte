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
  }
  input {
    display: block;
  }
</style>

<label>Name</label>
<input type="text" bind:value={name} placeholder="My sitemod" />

<label>Pattern</label>
<input type="text" bind:value={pattern} placeholder="example\.com" />

<h2>Scripts</h2>
{#each scripts as script}
  <CodeEditor language='javascript' bind:value={script}></CodeEditor>
{/each}

<h2>Styles</h2>
{#each styles as style}
  <CodeEditor language='css' bind:value={style}></CodeEditor>
{/each}
