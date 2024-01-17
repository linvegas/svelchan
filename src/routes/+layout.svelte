<script>
  import "$lib/styles/main.css"
</script>

<svelte:head>
  <title>Svelchan</title>
</svelte:head>

<div id="layout">
  <aside>
    <h1>Svelchan</h1>
    <label>
      Board:
      <select>
        <option value="g">/g</option>
        <option value="b">/b</option>
        <option value="a">/a</option>
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
  }
  aside {
    background: darkcyan;
    padding: 0.5rem;
  }
</style>
