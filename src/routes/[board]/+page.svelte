<script>
  import Header from "$lib/components/Header.svelte"
  /** @type {import('./$types').PageServerData} */
  export let data;
  // src={`https://placehold.co/${thread.tn_w}x${thread.tn_h}`}
  // src={`https://i.4cdn.org/${data.board}/${thread.tim}s.jpg`}
</script>

<Header title={`Catalog -> ${data.board}`} />
<section>
  <ul>
    {#await data.lazy.threads}
      <p>Loading...</p>
      {:then threads}
      {#each threads as thread}
        <li>
          <a href={`${data.board}/${thread.no}`}>
            <img
              alt="There was supposed to be an img here"
              src={`https://placehold.co/${thread.tn_w}x${thread.tn_h}`}
              width={thread.tn_w}
              height={thread.tn_h}
              loading="lazy"
            />
          </a>
          {#if thread.sub}
            <h4>{@html thread.sub}</h4>
          {/if}
          <p>{@html thread.com}</p>
        </li>
      {/each}
    {/await}
  </ul>
</section>

<style>
  section {
    padding: 2rem 2rem;
    overflow: scroll;
  }
  ul {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  }
  li {
    height: 420px;
    background: darkslateblue;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 0 0.5rem hsl(0 0% 0% / 35%);
    border-radius: 0.5rem;
  }
  li > a > img {
    aspect-ratio: 3/2;
    object-fit: cover;
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  li > :not(img, a) {
    margin-inline: 1rem;
    text-wrap: pretty;
  }
  li > :not(img, a):first-child {
    margin-top: 1rem;
  }
  li > :last-child {
    margin-bottom: 1rem;
  }
  li > p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
</style>
