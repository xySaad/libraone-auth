<script lang="ts">
  import Config from "$lib/config.ts";

  interface Props {
    token: string;
  }

  let { token }: Props = $props();

  let iframeEl = $state<HTMLIFrameElement | null>(null);

  function handleMessage(event: MessageEvent): void {
    if (event.origin !== Config.RECEIVER_ORIGIN) return;
    if (!iframeEl || event.source !== iframeEl.contentWindow) return;

    const { type } = event.data as { type: string };
    if (type === "ready") {
      iframeEl.contentWindow!.postMessage(
        { type: "token", data: token },
        Config.RECEIVER_ORIGIN,
      );
    } else if (type === "token_received") {
      history.back();
    }
  }
</script>

<svelte:window onmessage={handleMessage} />

<iframe bind:this={iframeEl} src={Config.RECEIVER_URL} title="receiver"></iframe>
