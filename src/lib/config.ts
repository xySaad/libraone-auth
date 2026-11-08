export const Config = {
  RECEIVER_ORIGIN: "https://libraone.undo.it",
  get RECEIVER_URL(): string {
    return this.RECEIVER_ORIGIN + "/accounts/intra?receiver=true";
  },
  GRAPHQL_ENDPOINT:
    "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
} as const;

export default Config;
