<script lang="ts">
  import Config from "$lib/config.ts";
  import { fetchGraphQL } from "$lib/graphql.ts";
  import { queries, type GetUserByIdResult } from "$lib/queries.ts";
  import Login from "./Login.svelte";
  import Suspend from "./Suspend.svelte";
  import ConsumerIFrame from "./ConsumerIFrame.svelte";

  let token = $state<string | null>(localStorage.getItem("token"));

  function getUserById(userId: number, jwt: string): Promise<GetUserByIdResult> {
    return fetchGraphQL<GetUserByIdResult>(
      queries.GET_USER_BY_ID,
      { userId },
      Config.GRAPHQL_ENDPOINT,
      jwt,
    );
  }

  function parseUserId(jwt: string): number {
    return JSON.parse(atob(jwt.split(".")[1])).sub as number;
  }

  let userPromise = $derived(
    token ? getUserById(parseUserId(token), token) : Promise.reject(new Error("No token")),
  );
</script>

{#if token === null}
  <Login onlogin={(t) => (token = t)} />
{:else}
  <div class="home">
    <Suspend promise={userPromise}>
      {#snippet loading()}
        <div>loading...</div>
      {/snippet}
      {#snippet ready(_data)}
        <ConsumerIFrame token={token!} />
      {/snippet}
      {#snippet error(_err)}
        <Login onlogin={(t) => (token = t)} />
      {/snippet}
    </Suspend>
  </div>
{/if}
