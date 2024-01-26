<script>
  import Header from "$lib/components/Header.svelte"
  /** @type {import('./$types').PageServerData} */
  export let data;
</script>

<Header title={`${data.board} -> ${data.threadNumber}`} />
<section>
  <ul>
    {#each data.posts as reply}
      <li id={`p${reply.no}`}>
        <header>
          <h4>{reply.name}</h4>
          <span>{reply.now}</span>
        </header>
        {#if reply.sub}
          <h4>{@html reply.sub}</h4>
        {/if}
        <p>{@html reply.com}</p>
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
    border: 2px solid dimgrey;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
  li > header {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.15rem 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    & > h4 {
      color: mediumseagreen;
    }
  }
  li > p, li > h4 {
    padding: 0.5rem;
  }
  li > p {
    & .quote {
      color: lightcoral;
    }
    & .quotelink {
      color: deepskyblue;
      &:hover {
        filter: brightness(1.25);
      }
    }
  }
</style>
