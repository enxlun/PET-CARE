function navigateTo(route) {
  window.location.hash = route;
}

function router() {
  const route = window.location.hash.replace("#", "");

  const app = document.getElementById("app");

  switch (route) {
    case "home":
      app.innerHTML = "<h1>Home Page</h1>";
      break;

    case "adopt":
      app.innerHTML = "<h1>Үрчлэх (Adopt) Page</h1>";
      break;

    case "about":
      app.innerHTML = "<h1>About Page</h1>";
      break;

    default:
      app.innerHTML = "<h1>Home Page</h1>";
      break;
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
