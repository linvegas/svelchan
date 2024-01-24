<script>
  import "$lib/styles/main.css"
  import { goto } from "$app/navigation"
  /** @type {import('./$types').LayoutData} */
  export let data;
  /** @type {string} */
  let selectedBoard;
</script>

<svelte:head>
  <title>Svelchan</title>
</svelte:head>

<div id="layout">
  <aside>
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
  <main>
    <slot />
  </main>
</div>

<style>
  #layout {
    display: grid;
    grid-template-columns: fit-content(20ch) minmax(min(50vw, 30ch), 1fr);
    grid-template-rows: 100vh;
  }
  aside {
    background: darkcyan;
    padding: 0.5rem;
  }
  main {
    display: grid;
    grid-template-rows: 60px 1fr;
  }
</style>
