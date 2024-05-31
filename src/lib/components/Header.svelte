<script>
  import { sidebarView } from "$lib/store.ts"

  import IconMenu from "$lib/components/IconMenu.svelte"

  function handleSideBar() {
    sidebarView.update(view => !view);
  }
</script>

<header>
  <button class="togglebar" title="Toggle sidebar" on:click={handleSideBar}>
    <IconMenu />
  </button>

  <slot name="select" />

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

    & > svg {
      filter: invert(50%);
      transition: 100ms;

      &:hover {
        filter: invert(0);
      }
    }
  }
  menu {
    padding-left: 0;
    margin-left: auto;
  }
</style>
