import { state as $state } from "rbind";

export const Suspend = (promise, { loading, ready, error }) => {
  const state = $state({ type: "loading" });
  promise
    .then((data) => (state.value = { type: "ready", data }))
    .catch((error) => (state.value = { type: "error", error }));

  return ($) => {
    const { type, data, error: err } = $(state);

    switch (type) {
      case "loading":
        return loading;
      case "ready":
        return ready(data);
      case "error":
        return error(err);
    }
  };
};
