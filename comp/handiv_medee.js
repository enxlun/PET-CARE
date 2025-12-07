class HandivMedee extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        //implementation
    }

    connectedCallback() {
        
        const title = this.getAttribute("title") || "No title";
        const description = this.getAttribute("description") || "";
        const date = this.getAttribute("date") || "";
        const tag = this.getAttribute("tag") || "";
        const time = this.getAttribute("time") || "";
        const views = this.getAttribute("views") || "";
        const image = this.getAttribute("image") || "";

    this.shadowRoot.innerHTML = `
      <style>
        .card {
        margin: 20px 0;
          width: 260px;
          background: white;
          border-radius: 16px;
          border: 1px solid #f7e49c;
          padding: 16px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          font-family: sans-serif;
        }
        img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 12px;
        }
        h3 {
          margin: 12px 0 6px;
          font-size: 18px;
          font-weight: 600;
        }
        p {
          color: #555;
          font-size: 14px;
          line-height: 1.4;
        }
        .info {
          margin-top: 10px;
          font-size: 13px;
          color: #666;
        }
        .row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
        }
        .btn {
          margin-top: 16px;
          width: 100%;
          background: white;
          border: 1px solid #f6d35e;
          color: #b88a00;
          padding: 10px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
        }
        .btn:hover {
          background: #fff8dc;
        }
      </style>

      <div class="card">
        <img src="${image}" alt="Image">

        <h3>${title}</h3>

        <p>${description}</p>

        <div class="info">
          <div class="row">📅 ${date} | ${tag}</div>
          <div class="row">⏱ ${time}</div>
          <div class="row">👁 ${views}</div>
        </div>

        <button class="btn">Үргэлжлүүлэн унших</button>
      </div>
    `;
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

window.customElements.define("donation-card", HandivMedee);