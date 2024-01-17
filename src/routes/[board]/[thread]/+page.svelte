<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>Thread Page</h1>

<main class="container">
  <ul>
    {#each data.thread as thread}
      <li>
        <h4>{thread.sub ? thread.sub : ""}</h4>
        <h4>{thread.name}</h4>
        <p>{@html thread.com}</p>
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
  li {
    background: rebeccapurple;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
</style>
