<script>
  import "highlight.js/styles/github.css"
  import hljs from 'highlight.js/lib/highlight'
  import javascript from 'highlight.js/lib/languages/javascript'
  import css from 'highlight.js/lib/languages/css'
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('css', css)

  export let value = ''
  export let language = 'javascript'
  $: highlightedValue = hljs.highlight(language, value).value
  let scrollY = 0

  function handleScroll (event) {
    scrollY = event.target.scrollTop
  }

</script>

<style>
  .container {
    position: relative;
    height: 200px;
    width: 100%;
    overflow: hidden;
    border: 1px solid grey;
  }
  pre {
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  code {
    font-family: monospace;
    font-size: 1.1em;
  }
  textarea {
    font-family: monospace;
    font-size: 1.1em;
    appearance: none;
    border: 0;
    resize: none;
    color: transparent;
    caret-color: black;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    width: 100%;
    height: 100%;
  }
  textarea:focus, textarea:active {
    border: 0;
    outline: 0
  }
</style>

<div class="container">
  <pre style="transform: translateY(-{scrollY}px)">
    <code contenteditable="false" bind:innerHTML={highlightedValue}></code>
  </pre>
  <textarea on:scroll={handleScroll} bind:value></textarea>
</div>

