<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>Catalog Page</h1>

<main class="container">
  <ul>
    {#each data.threads as thread}
      <li>
        <img
          alt="Thumbnail"
          src={`https://placehold.co/${thread.tn_w}x${thread.tn_h}`}
          width={thread.tn_w}
          height={thread.tn_h}
          loading="lazy"
        />
        <h4>{thread.sub ? thread.sub : ""}</h4>
        <p>{@html thread.com}</p>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    padding-block: 2rem;
  }
  h1 {
    text-align: center;
  }
  ul {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  }
  li {
    background: rebeccapurple;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
</style>
