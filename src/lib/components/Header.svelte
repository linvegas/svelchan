<script>
  import { sidebarView } from "$lib/store.js"
  import { goto } from "$app/navigation";

  import IconMenu from "$lib/components/IconMenu.svelte"

  export let boards;

  $:selectedBoard = "g";

  function handleSideBar() {
    sidebarView.update(view => !view);
  }
</script>

<header>
  <button class="togglebar" title="Toggle sidebar" on:click={handleSideBar}>
    <IconMenu />
  </button>
  <label for="boardSelection"> Board: </label>
  <select name="boardSelection" bind:value={selectedBoard} on:change={() => goto(`/${selectedBoard}`)}>
    <option value="">--Choose a board--</option>
    {#each boards as b}
      <option value={b.board}>
        /{b.board} - {b.title}
      </option>
    {/each}
  </select>
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

    & > label {
      display: none;
    }

    & > select {
      width: 10ch;
      background: color-mix(in lab, var(--c-bg) 80%, var(--c-mix));
      border-width: 0;
      border-radius: 0.25rem;
      padding: 0.25rem 0.5rem;
    }
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
