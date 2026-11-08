<script lang="ts">
  import type { Snippet } from "svelte";

  type SuspendStatus<T> =
    | { type: "loading" }
    | { type: "ready"; data: T }
    | { type: "error"; error: unknown };

  interface Props<T> {
    promise: Promise<T>;
    loading?: Snippet;
    ready?: Snippet<[T]>;
    error?: Snippet<[unknown]>;
  }

  let { promise, loading, ready, error }: Props<unknown> = $props();

  let status = $state<SuspendStatus<unknown>>({ type: "loading" });

  $effect(() => {
    status = { type: "loading" };
    promise
      .then((data) => (status = { type: "ready", data }))
      .catch((err) => (status = { type: "error", error: err }));
  });
</script>

{#if status.type === "loading"}
  {@render loading?.()}
{:else if status.type === "ready"}
  {@render ready?.(status.data)}
{:else}
  {@render error?.(status.error)}
{/if}
