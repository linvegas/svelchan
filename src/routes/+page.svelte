<script>
  import Header from "$lib/components/Header.svelte"

  /** @type {import('./$types').PageServerData} */
  export let data;
</script>

<Header>
  <h2 slot="context">List of Boards</h2>
</Header>
<main>
  <ul>
    {#each data.boards as b}
      <li>
        <header>
          <a href={`/${b.board}`}>
            <h4>
              {b.title}
            </h4>
            <span class="board-slash">
              /{b.board}
            </span>
          </a>
          {#if !b.ws_board}
            <span class="nsfw">
              <strong>NSFW</strong>
            </span>
          {/if}
        </header>
        <div class="info">
          <p>{@html b.meta_description}</p>
        </div>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    padding: 2rem;
  }
  ul {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  }
  li {
    background: color-mix(in lab, var(--c-bg) 90%, var(--c-mix));
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.2rem hsl(0 0% 0% / 35%);
    &:hover {
      background: color-mix(in lab, var(--c-bg) 85%, var(--c-mix));
    }
    & > header {
      margin-bottom: 1rem;
      & h4 {
        color: var(--c-accent);
        display: inline-block;
        }
      & span.board-slash {
        margin-inline: 0.25rem 0.5rem;
        color: var(--c-accent);
      }
      & > span.nsfw {
        font-size: 0.8rem;
        color: var(--c-danger);
        border: 2px solid var(--c-danger);
        padding: 0.1rem;
        border-radius: 0.25rem;
      }
      & a.board-link {
        background: rgba(0, 0, 0, 0.25);
        padding: 0.15rem 0.5rem;
        border-radius: 0.25rem;
        &:hover {
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
</style>
