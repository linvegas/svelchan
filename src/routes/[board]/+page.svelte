<script>
  import { goto } from "$app/navigation";

  import Header from "$lib/components/Header.svelte"
  import IconMesg from "$lib/components/IconMesg.svelte"
  import IconImg from "$lib/components/IconImg.svelte"

  /** @type {import('./$types').PageServerData} */
  export let data;
  let selectedBoard = data.board;
</script>

<Header>
  <div slot="select">
    <label for="board-selection">Board:</label>
    <select name="board-selection" bind:value={selectedBoard} on:change={() => goto(`/${selectedBoard}`)}>
      <option value="">--Choose a board--</option>
      {#each data.boards as b}
        <option value={b.board}>
          /{b.board}
        </option>
      {/each}
    </select>
  </div>

  <h2 slot="context">
    {data.title}
  </h2>
</Header>
<main>
  <ul>
    {#await data.lazy.threads}
      <p>Loading...</p>
      {:then threads}
      {#each threads as thread}
        <li>
          <a href={`${data.board}/${thread.no}`}>
            <img
              alt="Thumbnail"
              src={`/api/getimage?q=https://i.4cdn.org/${data.board}/${thread.tim}s.jpg`}
              width={thread.tn_w}
              height={thread.tn_h}
              loading="lazy"
            />
          </a>
          {#if thread.sub}
            <h4>{@html thread.sub}</h4>
          {/if}
          {#if thread.com}
            <p>{@html thread.com}</p>
          {/if}
          <div class="replies">
            <span>
              <IconMesg />
              {thread.replies}
            </span>
            <span>
              <IconImg />
              {thread.images}
            </span>
          </div>
        </li>
      {/each}
    {/await}
  </ul>
</main>

<style>
  main {
    padding: 2rem;
  }

  label[for="board-selection"] {
    display: none;
  }

  select[name="board-selection"] {
    width: 7ch;
    background: color-mix(in lab, var(--c-bg) 80%, var(--c-mix));
    border-width: 0;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
  }

  ul {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  }
  li {
    height: 410px;
    background: color-mix(in lab, var(--c-bg) 90%, var(--c-mix));
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 0 0.2rem hsl(0 0% 0% / 35%);
    border-radius: 0.5rem;
  }
  li > a > img {
    aspect-ratio: 3/2;
    object-fit: cover;
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  li > div.replies {
    display: flex;
    justify-content: space-evenly;
    margin-top: auto;
    background: transparent;
    color: var(--c-bg);
    & span {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 0.25rem;
      & > svg {
        width: 1rem;
      }
      &:first-child {
        border-bottom-left-radius: 0.5rem;
        background: color-mix(in lab, var(--c-accent) 80%, var(--c-bg));
      }
      &:last-child {
        border-bottom-right-radius: 0.5rem;
        background: color-mix(in lab, var(--c-accent) 60%, var(--c-bg));
      }
    }
  }
  li > :not(img, a, div.replies) {
    margin-inline: 1rem;
    text-wrap: pretty;
  }
  li > :not(img, a):first-child {
    margin-top: 1rem;
  }
  li > p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
</style>
