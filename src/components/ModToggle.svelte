<script>

  export let active = false

</script>

<style>

  button {
    appearance: none;
    border: 0;
    width: 16px;
    height: 16px;
    background: transparent url("../images/sitemod_icon_idle_16.png") center no-repeat;
  }

  .active {
    background: transparent url("../images/sitemod_icon_active_16.png") center no-repeat;
  }

</style>

<button class:active={active} on:click={() => active = !active } />