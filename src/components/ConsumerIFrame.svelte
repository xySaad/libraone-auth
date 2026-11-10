<script module>
  const messageHandler = (
    ev: MessageEvent,
    iframeEl: HTMLIFrameElement,
    token: string,
  ) => {
    if (!iframeEl.contentWindow) return;
    if (ev.origin !== Config.RECEIVER_ORIGIN) return;
    if (ev.source !== iframeEl.contentWindow) return;

    const { type }: { type: string } = ev.data;
    switch (type) {
      case "ready":
        iframeEl.contentWindow.postMessage(
          { type: "token", data: token },
          Config.RECEIVER_ORIGIN,
        );
        break;
      case "token_received":
        history.back();
      default:
        break;
    }
  };
</script>

<script lang="ts">
  import Config from "$lib/config.ts";

  interface Props {
    token: string;
  }

  let { token }: Props = $props();

  function receiver(iframeEl: HTMLIFrameElement) {
    const h = (e: MessageEvent) => messageHandler(e, iframeEl, token);
    window.addEventListener("message", h);

    return {
      destroy() {
        window.removeEventListener("message", h);
      },
    };
  }
</script>

<iframe use:receiver src={Config.RECEIVER_URL} title="receiver"></iframe>
