class DonationAmount extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const amount = this.getAttribute("value");
    const label = this.getAttribute("label");

    this.shadowRoot.innerHTML = `
      <style>
        .amount-btn {
          padding: 1rem;
          background: white;
          border: 2px solid var(--border);
          border-radius: var(--radius);
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
          font-weight: 500;
        }

        .amount-btn:hover {
          border-color: var(--primary);
          background: rgba(244, 208, 63, 0.1);
        }

        .selected {
          border-color: var(--primary);
          background: var(--primary);
          color: var(--primary-foreground);
        }

        .amount-value {
          font-size: 1.5rem;
          font-weight: 600;
          display: block;
        }

        .amount-label {
          font-size: 0.75rem;
          color: var(--muted-foreground);
          margin-top: 0.25rem;
          display: block;
        }

        .selected .amount-label {
          color: var(--primary-foreground);
          opacity: 0.8;
        }
      </style>

      <button class="amount-btn">
        <span class="amount-value">₮${Number(amount).toLocaleString()}</span>
        <span class="amount-label">${label}</span>
      </button>
    `;

    this.button = this.shadowRoot.querySelector(".amount-btn");

    this.button.addEventListener("click", () => {
      this.selectAmount();
    });
  }

  selectAmount() {
    // remove selection from all buttons
    document.querySelectorAll("donation-amount").forEach(el => el.removeSelected());

    // mark this one selected
    this.button.classList.add("selected");

    // emit custom event
    this.dispatchEvent(new CustomEvent("amount-selected", {
      detail: {
        value: Number(this.getAttribute("value"))
      },
      bubbles: true
    }));
  }

  removeSelected() {
    this.button?.classList.remove("selected");
  }
}

customElements.define("donation-amount", DonationAmount);
