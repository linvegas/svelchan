<script>
  import Header from "$lib/components/Header.svelte"
  /** @type {import('./$types').PageServerData} */
  export let data;
</script>

<Header>
  <h2 slot="context">List of Boards</h2>
</Header>
<section>
  <ul>
    {#each data.boards as board}
      <li>
        <header>
          <h4>{board.title}</h4>
          <div>
            <a class="board-link" href={`/${board.board}`}>
              <span>
                /{board.board}
              </span>
            </a>
          </div>
        </header>
        <div class="info">
          <p>{@html board.meta_description}</p>
          {#if !board.ws_board}
            <span class="nsfw">
              <strong>NSFW</strong>
            </span>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    padding: 2rem;
    overflow: scroll;
  }
  ul {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  }
  li {
    background: darkviolet;
    padding: 0.5rem;
    border-radius: 0.5rem;
    & > header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      & > h4 {
        color: bisque;
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
    & div.info {
      display: flex;
      gap: 0.25rem;
      align-items: flex-start;
    }
    & span.nsfw {
      font-size: 0.8rem;
      color: red;
      border: 2px solid red;
      padding: 0.1rem;
      border-radius: 0.25rem;
    }
  }
</style>
