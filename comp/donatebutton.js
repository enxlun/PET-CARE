class Donatebutton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /*html*/ `
        <div class="floating-donate">
            <button class="floating-donate-btn" onclick="window.location.href='../handiv/handiv.html'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Хандив өгөх
            </button>
        </div>`;
    }
}

window.customElements.define('donate-button', Donatebutton);
