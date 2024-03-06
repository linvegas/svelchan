<script>
  import Header from "$lib/components/Header.svelte"

  /** @type {import('./$types').PageServerData} */
  export let data;

  $: filteredBoards = data.boards;

  let selectedCategory = 1;

  let categories = [
    {
      id: 1, name: "All", items: []
    },
    {
      id: 2, name: "Video Games",
      items: ["v", "vg", "vm", "vmg", "vp", "vr", "vrpg", "vst"]
    },
    {
      id: 3, name: "Japonese Culture",
      items: ["a", "c", "w", "m", "cgl", "cm", "f", "n", "jp", "vt"]
    },
    {
      id: 4, name: "Interests",
      items: ["co", "g", "tv", "k", "o", "an", "tg", "sp", "xs", "pw", "sci", "his", "int", "out", "toy"]
    },
    {
      id: 5, name: "Creative",
      items: ["i", "po", "p", "ck", "ic", "wg", "lit", "mu", "fa", "3", "gd", "diy", "wsg", "qst"]
    },
    {
      id: 6, name: "Other",
      items: ["biz", "trv", "fit", "x", "adv", "lgbt", "mpl", "news", "wsr", "vip"]
    },
    {
      id: 7, name: "Misc",
      items: ["b", "r9k", "pol", "bant", "soc", "s4s"]
    },
    {
      id: 8, name: "Adult",
      items: ["s", "hc", "hm", "h", "e", "u", "d", "y", "t", "hr", "gif", "aco", "r"]
    },
  ];

  /** @param {number} id */
  function handleFilter(id) {
    selectedCategory = id

    const category = categories.find(c => c.id === id);

    if (category) {
      if (category.items.length <= 0) {
        filteredBoards = data.boards;
        return;
      }

      filteredBoards = data.boards.filter(b => {
        return category.items.includes(b.board)
      })
    }
  }
</script>

<Header>
  <h2 slot="context">List of Boards</h2>
</Header>
<main>
  <div role="tablist" id="filter">
    {#each categories as category}
      <button
        on:click={() => handleFilter(category.id)}
        role="tab"
        class={selectedCategory === category.id ? "actived" : ""}>
        {category.name}
      </button>
    {/each}
  </div>
  <ul>
    {#each filteredBoards as b}
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
  div#filter {
    padding-bottom: 1rem;
    & button {
      border-width: 0;
      background: color-mix(in lab, var(--c-bg) 85%, var(--c-mix));
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      margin-right: 1rem;
      margin-bottom: 1rem;
      cursor: pointer;
      transition: all 100ms;
      &.actived {
        background: var(--c-accent);
        color: var(--c-bg);
      }
      &:hover:not(.actived),
      &:focus-visible:not(.actived) {
        background: color-mix(in lab, var(--c-bg) 70%, var(--c-mix));
      }
      &:active {
        outline: 1px solid var(--c-mix);
      }
    }
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
