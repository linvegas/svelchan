<script>
  import { sidebarView } from "$lib/store.js"
  /** @type {string} */
  // export let title = "Header";
  import menuIcon from "$lib/assets/menu.svg"
  function handleSideBar() {
    sidebarView.update(view => !view);
  }
</script>

<header>
  <button title="Change sidebar" on:click={handleSideBar}>
    <img class="svg" alt="Menu" src={menuIcon} />
  </button>
  <slot name="context">
    <h2>Context</h2>
  </slot>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-inline: 2rem;
    background: darkslategrey;
  }
  button {
    border-width: 0;
    border-radius: 0.25rem;
    cursor: pointer;
    background: transparent;
    &:hover {
      filter: brightness(1.25);
    }
  }
  .svg {
    filter: invert(65%);
  }
  /* h2 {
    line-height: 60px;
  } */
</style>
