import Config from "../config";
import { sendToken } from "../e2e";
import { fetchGraphQL } from "../lib/graphql";
import { queries } from "../lib/queries";
import { Login } from "./login";
import html, { state } from "rbind";
import { Suspend } from "./suspend";

const { div, button, img } = html;

const getUserById = async (userId, jwt) =>
  fetchGraphQL(
    queries.GET_USER_BY_ID,
    { userId },
    Config.GRAPHQL_ENDPOINT,
    jwt,
  );
export const Home = () => {
  const token = localStorage.getItem("token");
  if (token === null) return Login();
  const userId = JSON.parse(atob(token.split(".")[1])).sub;

  return div().add(
    Suspend(getUserById(userId, token), {
      loading: div({ textContent: "loading..." }),
      ready: ({ user_by_pk: user }) =>
        div({ className: "current-user" }).add(
          div({ className: "user" }).add(
            img({ className: "avatar", src: user.avatarUrl }),
            div({
              className: "fullname",
              textContent: `${user.firstName} ${user.lastName}`,
            }),
          ),
          button({
            onclick: () => sendToken(token),
            className: "button login-button",
            textContent: `Continue as ${user.login}`,
          }),
        ),
      error: () => Login(),
    }),
  );
};
