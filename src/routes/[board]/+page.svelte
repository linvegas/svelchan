<script>
  import Header from "$lib/components/Header.svelte"
  import imageIcon from "$lib/assets/image.svg"
  import messageIcon from "$lib/assets/message-square.svg"

  /** @type {import('./$types').PageServerData} */
  export let data;

  /**
    * @param {HTMLImageElement} node
    * @param {string} url
  */
  function getImage(node, url) {
    const update = async () => {
      const res = await self.fetch(`/api/getimage?query=${url}`);
      const blob = await res.blob();
      const imgUrl = URL.createObjectURL(blob);
      node.src = imgUrl;
    }
    update();
  }
</script>

<Header>
  <h2 slot="context">
    /{data.board}/ - {data.title}
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
              src={`https://placehold.co/250x250`}
              width={thread.tn_w}
              height={thread.tn_h}
              loading="lazy"
              use:getImage={`https://i.4cdn.org/${data.board}/${thread.tim}s.jpg`}
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
              <img class="svg" src={messageIcon} alt="R:" />
              {thread.replies}
            </span>
            <span>
              <img class="svg" src={imageIcon} alt="I:" />
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
    padding: 2rem 2rem;
  }
  ul {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  }
  li {
    height: 410px;
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
  li > div.replies {
    display: flex;
    justify-content: space-evenly;
    margin-top: auto;
    background: transparent;
    & span {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 0.25rem;
      & > img.svg {
        filter: invert(90%);
        width: 1rem;
      }
      &:first-child {
        border-bottom-left-radius: 0.5rem;
        background: darkmagenta;
      }
      &:last-child {
        background: darkviolet;
        border-bottom-right-radius: 0.5rem;
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
  /*li > :last-child {
    margin-bottom: 1rem;
  }*/
  li > p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
</style>
