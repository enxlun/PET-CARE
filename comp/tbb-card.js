class TbbCard extends HTMLElement {
  constructor() {
    super();

    
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const number = this.getAttribute("number");
    const title = this.getAttribute("title");
    const image = this.getAttribute("image");

        this.shadowRoot.innerHTML = `
      <style>
        .card {
          padding: 20px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          text-align: center;
          justify-content: center;
          align-items: center;
          gap: 10px;
          background: transparent;
          width: 250px;
        }

        h2 { 
          margin: 0; 
          font-size: 1.8rem; 
          font-weight: 600; 
          color: #6BCF6B; /* ногоон, шар гэх мэт өөрчилж болно */
        }

        h3 { 
          margin: 0;
          font-size: 1rem; 
          color: #666; 
          font-weight: 400;
        }

        img { 
          width: 70px; 
          height: 70px; 
          margin-top: 10px;
        }
      </style>

      <div class="card">
        <h2>${number}</h2>
        <h3>${title}</h3>
        <img src="${image}" alt="icon" />
      </div>
    `;
  }
}

customElements.define("tbb-card", TbbCard);
