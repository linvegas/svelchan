<script>
  import { slide } from "svelte/transition";
  import { sidebarView } from "$lib/store.js"
  import { goto } from "$app/navigation";

  import "$lib/styles/main.css";

  /** @type {import('./$types').LayoutData} */
  export let data;

  $: selectedBoard = data.board;

  /** @type {boolean} */
  let sidebarstate;
  sidebarView.subscribe(value => sidebarstate = value);

  /** @param {KeyboardEvent} event */
  function onKeyPressed(event) {
    switch (event.key) {
      case 'b':
        sidebarView.update(view => !view);
        break;
    }
  }
</script>

<svelte:window on:keypress={onKeyPressed} />

<svelte:head>
  <title>Svelchan</title>
</svelte:head>

<div id="layout">
  {#if sidebarstate}
    <aside
      class:hidden={!sidebarstate}
      transition:slide={{
        delay: 0, duration: 150, axis: 'x',
      }}>
      <h1><a href="/">Svelchan</a></h1>
      <label>
        Board:
        <select bind:value={selectedBoard} on:change={() => goto(`/${selectedBoard}`)}>
          <option value="">--Choose a board--</option>
          {#each data.boards as board}
            <option value={board.board}>
              /{board.board} - {board.title}
            </option>
          {/each}
        </select>
      </label>
    </aside>
  {/if}
  <section class:hidden={!sidebarstate}>
    <slot />
  </section>
</div>

<style>
  #layout {
    --sidebar-w: 200px;

    & aside {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;

      background: color-mix(in lab, var(--c-bg) 80%, var(--c-mix));
      padding: 1rem;
      width: var(--sidebar-w);

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      & > h1 {
        color: var(--c-accent);
      }

      & label {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;

        & select {
          width: 100%;
          border-width: 0;
          border-radius: 0.25rem;
          padding: 0.25rem 0.5rem;
        }
      }
    }
    & > section {
      margin-left: var(--sidebar-w);
      transition: margin-left 150ms;
      &.hidden {
        margin-left: 0;
      }
    }
  }
</style>
