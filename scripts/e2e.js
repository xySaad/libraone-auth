import Config from "./config";

export const messageHandler = (receiverWindow, receiverOrigin, token) => {
  const handler = (event) => {
    if (event.origin !== receiverOrigin) return;
    if (event.source !== receiverWindow) return;
    const { type, data } = event.data;
    switch (type) {
      case "ready":
        receiverReadyHandler(receiverWindow, receiverOrigin, token);
        window.removeEventListener("message", handler);
        break;
      default:
        break;
    }
  };

  return handler;
};

const receiverReadyHandler = (receiverWindow, receiverOrigin, token) => {
  receiverWindow.postMessage({ type: "token", data: token }, receiverOrigin);
  window.location.replace(Config.CALLBACK_URL);
};

export const sendToken = (token) => {
  const receiverWindow = window.open(Config.RECEIVER_URL, "_blank");

  window.addEventListener(
    "message",
    messageHandler(receiverWindow, Config.RECEIVER_ORIGIN, token),
  );
};
