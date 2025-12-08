class Header extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    connectedCallback() {
        //implementation
        this.innerHTML = /*html*/ `
        <header>
          <div class="container">
            <a href="#" class="logo">
              <img src="svg/logo.svg" alt="Амьтад Аврах Лого" class="logo-image">
              <span>Савархан</span>
            </a>
            <nav>
              <button onclick="window.location.href='archlah/archlah.html'">Арчлах</button>
              <button onclick="window.location.href='urchleh/urchleh.html'">Үрчлэх</button>
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

              <button class="btn btn-ghost hide-mobile">Нэвтрэх</button>
              <button class="btn btn-primary">Бүртгүүлэх</button>

              <button class="btn btn-ghost btn-icon mobile-menu-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
        </div>
      </header> `;
    }

    disconnectedCallback() {
        //implementation
    }

    attributeChangedCallback(name, oldVal, newVal) {
        //implementation
    }

    adoptedCallback() {
        //implementation
    }

}

window.customElements.define('site-header', Header);