<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>Catalog Page</h1>

<ul>
  {#each data.threads as thread}
    <li>
      <h4>{thread.sub}</h4>
      <p>{@html thread.com}</p>
    </li>
  {/each}
</ul>

<style>
  li {
    background: rebeccapurple;
    padding: 2rem;
    margin-bottom: 1rem;
  }
</style>
