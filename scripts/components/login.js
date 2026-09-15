import html, { state } from "rbind";
import { sendToken } from "../e2e";
const { div, input, span, button } = html;
const handleLogin = async (login, password) => {
  const credentials = btoa(`${login}:${password}`);

  const resp = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
    method: "POST",
    headers: { Authorization: `Basic ${credentials}` },
  });

  if (!resp.ok) {
    console.error("Login failed:", resp.status, resp.statusText);
    return;
  }

  const token = await resp.json();

  localStorage.setItem("token", token);
  sendToken(token);
};

export const Login = () => {
  const login = state();
  const password = state();
  const hidePassword = state(true);

  return div({ className: "login-form" }).add(
    div({ className: "input" }).add(
      input({
        placeholder: "login",
        is: { value: login },
      }),
    ),
    div({ className: "password-input input" }).add(
      input({
        type: ($) => ($(hidePassword) ? "password" : "text"),
        placeholder: "password",
        is: { value: password },
      }),
      button({
        className: "button",
        onclick: () => (hidePassword.value = !hidePassword.value),
      }).add(
        span({
          className: "material-symbols-outlined",
          textContent: ($) =>
            $(hidePassword) ? "visibility" : "visibility_off",
        }),
      ),
    ),
    button({
      className: "button login-button",
      onclick: () => handleLogin(login.value, password.value),
    }).add(
      div({ textContent: "Enter" }),
      span({ className: "material-symbols-outlined", textContent: "login" }),
    ),
  );
};
