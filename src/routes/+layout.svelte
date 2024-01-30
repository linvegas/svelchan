<script>
  import { slide } from "svelte/transition";
  import { sidebarView } from "$lib/store.js"
  import { goto } from "$app/navigation";

  import "$lib/styles/main.css";

  /** @type {import('./$types').LayoutData} */
  export let data;

  /** @type {string} */
  let selectedBoard;

  /** @type {boolean} */
  let sidebarViewValue;
  sidebarView.subscribe(value => sidebarViewValue = value);
</script>

<svelte:head>
  <title>Svelchan</title>
</svelte:head>

<div id="layout" class={sidebarViewValue ? "" : "sidebar-hidden"}>
  {#if sidebarViewValue}
    <aside
      transition:slide={{
        delay: 0, duration: 200, axis: 'x',
      }}>
      <h1><a href="/">Svelchan</a></h1>
      <label>
        Board:
        <select bind:value={selectedBoard} on:change={() => goto(`/${selectedBoard}`)}>
          {#each data.boards as board}
            <option value={board.board}>/{board.board}</option>
          {/each}
        </select>
      </label>
    </aside>
  {/if}
  <main>
    <slot />
  </main>
</div>

<style>
  #layout {
    display: grid;
    grid-template-columns: fit-content(20ch) minmax(min(50vw, 30ch), 1fr);
    grid-template-rows: 100vh;
    &.sidebar-hidden {
      grid-template-columns: auto 1fr;
    }
  }
  aside {
    background: darkcyan;
    padding: 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    & label {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  main {
    display: grid;
    grid-template-rows: 60px 1fr;
  }
</style>
