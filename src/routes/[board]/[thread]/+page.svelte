<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h2>Thread Page</h2>

<section class="container">
  <ul>
    {#each data.thread as thread}
      <li>
        <h4>{thread.sub ? thread.sub : ""}</h4>
        <h4>{thread.name}</h4>
        <p>{@html thread.com}</p>
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
  li {
    background: rebeccapurple;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
</style>
