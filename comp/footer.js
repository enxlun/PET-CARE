class Footer extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    connectedCallback() {
        //implementation
        this.innerHTML = /*html*/ `
        <footer>
            <div class="container">
            <div class="footer-grid">
            <div class="footer-section">
            <div class="footer-logo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Амьтад Аврах</span>
            </div>
            <p style="font-size: 0.875rem; color: var(--muted-foreground);">
                Аврагдсан амьтдад хайртай гэр олж өгөх, иж бүрэн дэмжлэгийн үйлчилгээ үзүүлэхэд зориулагдсан.
            </p>
            </div>

            <div class="footer-section">
            <h4>Хурдан холбоос</h4>
            <ul>
                <li><a href="#urchleh">Амьтан өрхжүүлэх</a></li>
                <li><a href="#archlah">Үйлчилгээ</a></li>
                <li><a href="#volunteer">Сайн дурынхан</a></li>
                <li><a href="#archlah">Түр асаргаа</a></li>
            </ul>
            </div>

            <div class="footer-section">
            <h4>Дэмжлэг</h4>
            <ul>
                <li><a href="#">Түгээмэл асуулт</a></li>
                <li><a href="#">Бидэнтэй холбогдох</a></li>
                <li><a href="#">Яаралтай тусламж</a></li>
                <li><a href="#">Амьтны асаргааны зөвлөгөө</a></li>
            </ul>
            </div>

            <div class="footer-section">
            <h4>Холбоо барих мэдээлэл</h4>
            <div class="footer-contact">
                <div class="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Амьтад аврах гудамж 123, Улаанбаатар</span>
                </div>
                <div class="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+976 9999 1199</span>
                </div>
                <div class="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>medeelel@savarkhan.mn</span>
                </div>
            </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2025 Амьтад Аврах. Бүх эрх хуулиар хамгаалагдсан. Манай үслэг найзуудынхаа төлөө ❤️-ээр хийсэн.</p>
        </div>
        </div>
    </footer> `;
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

window.customElements.define('site-footer', Footer);