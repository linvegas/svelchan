<script>
  import { sidebarView } from "$lib/store.js"
  import menuIcon from "$lib/assets/menu.svg"

  function handleSideBar() {
    sidebarView.update(view => !view);
  }
</script>

<header>
  <button class="togglebar" title="Toggle sidebar" on:click={handleSideBar}>
    <img class="svg" alt="Menu" src={menuIcon} />
  </button>
  <slot name="context">
    <h2>Context</h2>
  </slot>
  {#if $$slots.menu}
    <menu>
      <slot name="menu" />
    </menu>
  {/if}
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 1;

    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 2rem;
    background: color-mix(in lab, var(--c-bg) 95%, var(--c-mix));
    color: var(--c-accent);
    border-bottom: 1px solid var(--c-gray);
  }
  button.togglebar {
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
  menu {
    padding-left: 0;
    margin-left: auto;
  }
</style>
