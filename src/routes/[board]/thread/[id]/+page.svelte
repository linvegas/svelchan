<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type { PageServerData } from './$types';

  import Header from "$lib/components/Header.svelte"

  export let data: PageServerData;

  // let imagePosts = data.posts.filter(p => p.tim);
  let showImgView = false;

  let currentTime = Date.now()

  function formatDate(timestamp: number) {
    const now = Math.floor(currentTime / 1000);
    const diff = now - timestamp;

    const daysPassed = Math.floor(diff / 86400);
    const hoursPassed = Math.floor(diff / 3600);
    const minutesPassed = Math.floor(diff / 60) % 60;
    const secondsPassed = diff % 60;

    if (daysPassed > 0) {
      return `${daysPassed} ${daysPassed === 1 ? "day" : "days"} ago`;
    }

    if (hoursPassed > 0) {
      return `${hoursPassed} ${hoursPassed === 1 ? "hour" : "hours"} ago`;
    }

    if (minutesPassed > 0) {
      return `${minutesPassed} ${minutesPassed === 1 ? "minute" : "minutes"} ago`;
    }

    if (secondsPassed > 0) {
      return "just now";
    }

    return diff;
  }

  function highlightTarget(id: string, active: boolean) {
    const target = document.querySelector<HTMLLIElement>(`#p${id}`);

    if (target) {
      if (active) {
        target.classList.add("highlight");
      } else {
        target.classList.remove("highlight");
      }
    }
  }

  let popoverEl: HTMLDivElement;

  let popoverPos = {
    x: 0, y: 0,
  };

  function updatePopover(target: HTMLLIElement) {
    // /** @type {HTMLLIElement|null} */
    // const target = document.querySelector(`#p${id}`);

    // if (target) {
    const name = target.querySelector<HTMLHeadingElement>("h4.name");

    if (name && name.textContent) {
      const popName = popoverEl.querySelector("h4.name")
      if (popName) popName.textContent = name.textContent;
    }

    const com = target.querySelector<HTMLParagraphElement>("p.com");

    if (com && com.innerHTML) {
      const popCom = popoverEl.querySelector("p.com");
      if (popCom) popCom.innerHTML = com.innerHTML;
    }
    // }
  }

  function handlePopover(
    event: MouseEvent, active: boolean, id: string
  ) {
    if (!active) {
      popoverEl.style.visibility = "hidden";
      return
    } else {
      const target = document.querySelector<HTMLLIElement>(`#p${id}`);

      if (
        !target
        || target.getBoundingClientRect().top <= document.documentElement.clientHeight
        && target.getBoundingClientRect().bottom >= window.screenY
      ) {
        return
      }

      popoverEl.style.visibility = "visible";

      const refEl = event.currentTarget as HTMLAnchorElement;

      if (refEl) {
        updatePopover(target)

        const refRect = refEl.getBoundingClientRect();
        const popRect = popoverEl.getBoundingClientRect();

        if (refRect.top < popRect.height) {
          popoverPos.x = (refRect.bottom + window.scrollY) + (refRect.height * 0.2);
        } else {
          popoverPos.x = (refRect.top + window.scrollY) - popRect.height - (refRect.height * 0.2);
        }

        if (refRect.left > popRect.x) {
          popoverPos.y = (refRect.left + (refRect.width / 2)) - popRect.width / 2;
        } else {
          popoverPos.y = refRect.left;
        }
      }
    }
  }

  let mediaViewIdx = 0;

  function handleMediaView(idx: number) {
    mediaViewIdx = idx;
    showImgView = true;
  }

  onMount(() => {
    const quotelinks = document.querySelectorAll<HTMLAnchorElement>("a.quotelink");

    quotelinks.forEach(link => {
      const href = link.getAttribute("href")

      if (!href) return;

      const id = href.substring(2);

      link.addEventListener("mouseenter", e => {
        highlightTarget(id, true)
        handlePopover(e, true, id)
      })

      link.addEventListener("mouseleave", e => {
        highlightTarget(id, false)
        handlePopover(e, false, id)
      })
    })
  })
</script>

<Header>
  <h2 slot="context" style="display: inline-block;">
    <button
      title="Go back"
      class="back"
      on:click={() => goto("/" + data.board)}
    >
      &sol;{data.board}&sol;
    </button>
    <span style:color="var(--c-gray)" style:padding-inline="0.5rem">&gt;</span>
    {data.threadNumber}
    {#if data.posts[0].sub}
      <span style:color="var(--c-gray)" style:padding-inline="0.5rem">&gt;</span>
      <span style:color="var(--c-accent)">{@html data.posts[0].sub}</span>
    {/if}
  </h2>
</Header>
<main>
  <ul class="container">
    {#each data.posts as post, i}
      <li class="post" id={`p${post.no}`}>
        <header>
          <h4 class="name">{post.name}</h4>
          <span class="id">{post.no}</span>
          <span class="timestamp" title={post.now}>{formatDate(post.time)}</span>
          {#if post.replies && (post.replies.length > 0)}
            <ul class="replies">
              {#each post.replies as r}
                <li>
                  <a
                    class="reply-link"
                    href={`${data.threadNumber}#p${r}`}
                    on:mouseenter={(e) => {
                      highlightTarget(r, true)
                      handlePopover(e, true, r)
                    }}
                    on:mouseleave={(e) => {
                      highlightTarget(r, false)
                      handlePopover(e, false, r)
                    }}
                  >
                    &gt;&gt;{r}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </header>
        <article>
          {#if post.sub || post.com}
            <div class="content">
              {#if post.sub}
                <h4>{@html post.sub}</h4>
              {/if}
              {#if post.com}
                <p class="com">{@html post.com}</p>
              {/if}
            </div>
          {/if}
          {#if post.tim}
            <button
              class="btn-thumb"
              type="button"
              on:click={() => handleMediaView(i)}
            >
              <img
                alt="Thumbnail"
                src={`/api/getimage?url=https://i.4cdn.org/${data.board}/${post.tim}s.jpg`}
                width={post.tn_w}
                height={post.tn_h}
                loading="lazy"
              />
            </button>
          {/if}
        </article>
      </li>
    {/each}
    <hr>
  </ul>
</main>

{#if showImgView}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    id="view-overlay"
    role="button"
    tabindex="0"
    on:click={e => {
      if (e.target?.matches("div#view-overlay")) {
        showImgView = false;
      }
    }}>
    {#if data.posts[mediaViewIdx].ext !== ".webm"}
      <img
        alt="Preview"
        class="view-media"
        src={`/api/getimage?url=https://i.4cdn.org/${data.board}/${data.posts[mediaViewIdx].tim}${data.posts[mediaViewIdx].ext}`}
      />
    {:else}
      <video
        controls muted
        class="view-media"
        src={`/api/getimage?url=https://i.4cdn.org/${data.board}/${data.posts[mediaViewIdx].tim}${data.posts[mediaViewIdx].ext}`}
      >
        <track kind="captions"/>
      </video>
    {/if}
  </div>
{/if}

<div
  id="popover"
  bind:this={popoverEl}
  style:top={`${popoverPos.x}px`}
  style:left={`${popoverPos.y}px`}
>
  <h4 class="name">Anonymous</h4>
  <p class="com">KEK</p>
</div>

<style>
  div#popover {
    visibility: hidden;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    padding: 0.5rem;
    max-width: 400px;
    background-color: color-mix(in lab, var(--c-bg) 90%, var(--c-mix));
    border: 2px solid var(--c-l-gray);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.2rem hsl(0 0% 0% / 35%);
    & h4.name {
      color: var(--c-accent);
      margin-bottom: 0.5rem;
    }
  }
  h2 button.back {
    appearance: none;
    border: 0;
    color: color-mix(in lab, var(--c-accent) 70%, var(--c-mix));
    &:hover {
      background: transparent;
      cursor: pointer;
      color: color-mix(in lab, var(--c-accent) 20%, var(--c-mix));
    }
  }
  main {
    padding-block: 2rem;
  }
  li.post {
    border: 2px solid var(--c-gray);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    &:target {
      border-color: var(--c-accent);
    }
    &.highlight {
      border-color: var(--c-accent);
    }
  }
  li > header {
    font-size: 0.92rem;
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: color-mix(in lab, var(--c-bg) 95%, var(--c-mix));
    padding: 0.15rem 0.75rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    & > h4.name {
      color: var(--c-accent);
    }
    & > span.id {
      color: color-mix(in lab, var(--c-info) 50%, var(--c-mix));
    }
    & > span.timestamp {
      color: var(--c-l-gray);
      flex-shrink: 0;
    }
    & > ul.replies > * {
      display: inline-block;
      margin-left: 0.35rem;
      & a.reply-link:hover {
        text-decoration: underline;
      }
    }
  }
  li > article {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    padding: 0.75rem;
    & button.btn-thumb {
      all: unset;
      cursor: pointer;
      flex-shrink: 0;
      &:focus, &:focus-visible {
        outline: 2px solid lightblue;
      }
    }
    & h4 {
      margin-bottom: 1rem;
    }
  }
  .com {
    & .quote {
      color: var(--c-info);
    }
    & .quotelink {
      color: var(--c-secondary);
      &:hover {
        filter: brightness(1.25);
      }
    }
    & .prettyprint {
      font-size: 0.8rem;
      display: inline-block;
      max-width: 600px;
      margin-bottom: 1rem;
      background-color: color-mix(in lab, var(--c-bg) 97%, var(--c-mix));
      color: var(--c-info);
      padding: 0.25rem;
      border: 1px solid var(--c-l-gray);
      border-radius: 0.25rem;
      overflow-x: auto;
      cursor: text;
    }
  }
  hr {
    margin-top: 2rem;
    border: none;
    border-top: 5px double var(--c-gray);
    text-align: center;
    overflow: visible;
    &::after {
      content: "EOF";
      position: relative;
      padding-inline: 1rem;
      background: var(--c-bg);
      top: -0.85rem;
    }
  }
  div#view-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    & .view-media {
      max-width: 80%;
      max-height: 90%;
    }
  }
</style>
