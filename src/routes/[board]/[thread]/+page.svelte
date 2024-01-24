<script>
  import Header from "$lib/components/Header.svelte"
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Header title="Thread Page" />
<section>
  <ul>
    {#each data.thread as thread}
      <li>
        {#if thread.sub}
          <h4>{@html thread.sub}</h4>
        {/if}
        <h4>{thread.name}</h4>
        <p>{@html thread.com}</p>
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    padding: 2rem 10vw;
    overflow: scroll;
  }
  li {
    background: darkorchid;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
</style>
