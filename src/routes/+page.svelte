<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h2>Welcome to Svelchan</h2>
<section class="container">
  <h3>List of boards:</h3>
  <ul>
    {#each data.boards as board}
      <li>
        <span class="red">/{board.board}</span> -
        <strong>{board.title}</strong>
      </li>
    {/each}
  </ul>
</section>

<style>
  h2 {
    padding: 0.5rem 1rem;
    background: darkslategrey;
  }
  section {
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
