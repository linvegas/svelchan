<script>
  import Header from "$lib/components/Header.svelte"
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Header title="Welcome to Svelchan" />
<section>
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
  section {
    padding: 2rem 10vw;
    overflow: scroll;
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
