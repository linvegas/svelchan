<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>Welcome to Svelchan</h1>
<main class="container">
  <h3>List of boards:</h3>
  <ul>
    {#each data.boards as board}
      <li>
        <span class="red">/{board.board}</span> -
        <strong>{board.title}</strong>
      </li>
    {/each}
  </ul>
</main>

<style>
  h1 {
    text-align: center;
  }
  main {
    padding-block: 2rem;
  }
  h3 {
    text-align: center;
    margin-bottom: 2rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }
  li {
    background: rebeccapurple;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  .red {
    color: lightgreen;
  }
</style>
