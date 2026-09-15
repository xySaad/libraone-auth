export const Config = {
  RECEIVER_ORIGIN: "https://libraone.undo.it",
  get RECEIVER_URL() {
    return this.RECEIVER_ORIGIN + "/accounts/intra?receiver=true";
  },
  get CALLBACK_URL() {
    return this.RECEIVER_ORIGIN + "/accounts/intra?callback=true";
  },
  GRAPHQL_ENDPOINT:
    "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
};

export default Config;
