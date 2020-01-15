<script>
  import Options from './Options.svelte'

</script>

<style>
  :global(body), :global(html) {
    margin: 0;
    padding: 0;
    width: 400px;
    height: 600px;
    font-family: system-ui, sans-serif;
  }
  main {
    position: relative;
  }
  h1 {
    margin: 0;
  }
</style>

<h1>sitemod</h1>
<main>
  <Options></Options>
</main>
