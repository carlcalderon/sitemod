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
  let scrollX = 0
  let scrollY = 0

  function handleScroll (event) {
    scrollX = event.target.scrollLeft
    scrollY = event.target.scrollTop
  }

</script>

<style>
  .container {
    position: relative;
    height: 200px;
    width: 100%;
    overflow: hidden;
    border: 1px solid #c7c7c7;
  }
  pre {
    margin: 0;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
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
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    box-sizing: border-box;
  }
  textarea:focus, textarea:active {
    border: 0;
    outline: 0
  }
</style>

<div class="container">
  <pre style="transform: translate(-{scrollX}px, -{scrollY}px)">
    <code contenteditable="false" bind:innerHTML={highlightedValue}></code>
  </pre>
  <textarea on:scroll={handleScroll} bind:value></textarea>
</div>

