import { router } from "rbind";
import { Home } from "./components/home.js";

router.setup({
  "/": Home,
});
