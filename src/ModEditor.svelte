<script>

  export let name
  export let pattern
  export let scripts = []
  export let styles = []
  export let enabled = false

</script>
<style>
  label {
    font-weight: bold;
  }
  input {
    display: block;
  }
  textarea {
    width: 100%;
    height: 200px;
  }
</style>

<label>Name
  <input type="text" bind:value={name} placeholder="My sitemod" />
</label>
<label>Pattern
  <input type="text" bind:value={pattern} placeholder="example\.com" />
</label>

<h2>Scripts</h2>
{#each scripts as script}
  <textarea bind:value={script}></textarea>
  <button>Remove script</button>
{/each}
<button>Add script</button>

<h2>Styles</h2>
{#each styles as style}
  <textarea bind:value={style}></textarea>
  <button>Remove style</button>
{/each}
<button>Add style</button>

<input type="checkbox" bind:checked={enabled} />
