import { getHomePage } from "./pages/home.js";
import { getArchlahPage } from "../pages/archlah.js";
import { getUrchlehPage } from "../pages/urchleh.js";
import { getHandivPage } from "../pages/handiv.js";

const routes = {
  home: getHomePage,
  archlah: getArchlahPage,
  urchleh: getUrchlehPage,
    handiv: getHandivPage,
};

export function router() {
  const hash = location.hash.replace("#", "") || "home";
  const page = routes[hash] || getHomePage;

  document.getElementById("app").innerHTML = page();
}
