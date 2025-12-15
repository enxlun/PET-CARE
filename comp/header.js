class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <header>
        <div class="container">
          <a href="#home" class="logo">
            <img src="/svg/logo.svg" alt="Амьтад Аврах Лого" class="logo-image">
            <span>Савархан</span>
          </a>
          <nav>
            <button onclick="navigateTo('archlah')">Арчлах</button>
            <button onclick="navigateTo('urchleh')">Үрчлэх</button>
          </nav>

          <div class="header-actions">
            <div class="tooltip">
              <button class="btn btn-ghost btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="var(--secondary)" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <div class="tooltip-content">Хадгалсан амьтад</div>
            </div>

            <!-- Guest үед -->
            <div id="auth-guest" style="display:flex; gap:12px; align-items:center;">
              <button onclick="window.location.href='../login/login.html'" class="btn btn-ghost hide-mobile">Нэвтрэх</button>
              <button onclick="window.location.href='../login/register.html'" class="btn btn-primary">Бүртгүүлэх</button>
            </div>

            <!-- Нэвтэрсэн үед -->
            <div id="auth-user" style="display:none; gap:12px; align-items:center;">
              <span id="auth-name" class="hide-mobile"></span>
              <button onclick="navigateTo('profile')" class="btn btn-ghost hide-mobile">Хувийн хэсэг</button>
              <button id="logoutBtn" class="btn btn-ghost">Гарах</button>
            </div>

            <button class="btn btn-ghost btn-icon mobile-menu-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    `;

    // --- auth UI toggle ---
    const token = localStorage.getItem("token");
    let user = null;
    try { user = JSON.parse(localStorage.getItem("user") || "null"); } catch {}

    const guest = this.querySelector("#auth-guest");
    const authed = this.querySelector("#auth-user");
    const nameEl = this.querySelector("#auth-name");
    const logoutBtn = this.querySelector("#logoutBtn");

    if (token && user) {
      if (guest) guest.style.display = "none";
      if (authed) authed.style.display = "flex";
      if (nameEl) nameEl.textContent = user.name ? `Сайн уу, ${user.name}` : user.email;
    } else {
      if (guest) guest.style.display = "flex";
      if (authed) authed.style.display = "none";
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "../index.html#home";
      });
    }
  }
}

window.customElements.define("site-header", Header);
