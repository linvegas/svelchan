<script>
  import Header from "$lib/components/Header.svelte"
  import closeIcon from "$lib/assets/x.svg"

  /** @type {import('./$types').PageServerData} */
  export let data;

  /** @type {HTMLDialogElement} */
  let dialogEl;

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

  /** @type {{id: number, ext: string, width: number, height: number}} curPreview */
  let curPreview;

  let showDialog = false;

  /**
  * @param {number} imgId
  * @param {string} imgExt
  * @param {number} imgWidth
  * @param {number} imgHeight
  */
  function handleImagePreview(imgId, imgExt, imgWidth, imgHeight) {
    curPreview = {
      id: imgId,
      ext: imgExt,
      width: imgWidth,
      height: imgHeight,
    }
    showDialog = true;
    dialogEl.showModal()
  }

  function handleCloseDialog() {
    dialogEl.close();
    showDialog = false;
  }
</script>

<Header title={`${data.board} -> ${data.threadNumber}`} />
<section>
  <ul>
    {#each data.posts as reply}
      {#if reply.com}
        <li id={`p${reply.no}`}>
          <header>
            <h4>{reply.name}</h4>
            <span>{reply.now}</span>
          </header>
          <article>
            <div>
              {#if reply.sub}
                <h4>{@html reply.sub}</h4>
              {/if}
              <p>{@html reply.com}</p>
            </div>
            {#if reply.tim}
              <button
                class="btn-thumb"
                type="button"
                on:click={() => handleImagePreview(reply.tim, reply.ext, reply.w, reply.h)}
              >
                <img
                  alt="Thumbnail"
                  src={`https://placehold.co/${reply.tn_w}x${reply.tn_h}`}
                  width={reply.tn_w}
                  height={reply.tn_h}
                  loading="lazy"
                  use:getImage={`https://i.4cdn.org/${data.board}/${reply.tim}s.jpg`}
                />
              </button>
            {/if}
          </article>
        </li>
      {/if}
    {/each}
    <hr>
  </ul>
</section>
<dialog bind:this={dialogEl}>
  <header>
    <h2>Image preview</h2>
    <button title="Close" on:click={handleCloseDialog}>
      <img class="svg" src={closeIcon} alt="X" />
    </button>
  </header>
  {#if showDialog}
    <img
      alt="Preview"
      src={`https://placehold.co/${curPreview.width}x${curPreview.height}`}
      width={curPreview.width}
      height={curPreview.height}
      use:getImage={`https://i.4cdn.org/${data.board}/${curPreview.id}${curPreview.ext}`}
    />
  {/if}
</dialog>

<style>
  section {
    overflow: scroll;
    padding-block: 2rem;
  }
  ul {
    margin-inline: auto;
    width: min(960px, 100% - 4rem);
  }
  li {
    border: 2px solid dimgrey;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
  li > header {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.15rem 0.75rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    & > h4 {
      color: mediumseagreen;
    }
  }
  li > article {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 4rem;
    padding: 0.75rem;
    & button.btn-thumb {
      all: unset;
      cursor: pointer;
    }
    & h4 {
      margin-bottom: 1rem;
    }
    & p {
      & .quote {
        color: lightgreen;
      }
      & .quotelink {
        color: deepskyblue;
        &:hover {
          filter: brightness(1.25);
        }
      }
      & .prettyprint {
        inline-size: 650px;
        margin-top: 1rem;
        background-color: #222;
        color: lawngreen;
        padding: 0.25rem;
        border: 2px solid darkslategray;
        border-radius: 0.25rem;
        overflow-x: auto;
        cursor: text;
      }
    }
  }
  hr {
    margin-top: 2rem;
    border: none;
    border-top: 5px double #333;
    text-align: center;
    overflow: visible;
    &::after {
      content: "EOF";
      position: relative;
      padding-inline: 1rem;
      background: #1c1b22;
      top: -0.85rem;
    }
  }
  dialog {
    margin: auto;
    background: transparent;
    /* padding: 0.75rem; */
    border-width: 0;
    border-radius: 0.5rem;
    & > header {
      padding-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      & > button {
        border-width: 0;
        border-radius: 0.25rem;
        cursor: pointer;
        background: transparent;
        &:hover {
          filter: brightness(1.25);
          background: rgba(0, 0, 0, 0.25);
        }
        & img.svg {
          filter: invert(90%);
          width: 1.5rem;
        }
      }
    }
    & img {
      /*aspect-ratio: auto;*/
      max-height: 80vh;
      width: 100%;
    }
  }
  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>
