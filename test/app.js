// Current page state
let currentPage = 'home';

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    
    mobileMenu.classList.toggle('hidden');
    menuOpen.classList.toggle('hidden');
    menuClose.classList.toggle('hidden');
}

// Navigation function
function navigateTo(page) {
    // Update hash instead of directly rendering
    window.location.hash = page;
}

// Handle hash changes
function handleHashChange() {
    // Get page from hash, default to 'home'
    let page = window.location.hash.slice(1) || 'home';
    
    // Validate page
    if (!['home', 'urchleh', 'archlah', 'donate'].includes(page)) {
        page = 'home';
    }
    
    currentPage = page;
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuOpen.classList.remove('hidden');
        menuClose.classList.add('hidden');
    }
    
    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (page === 'urchleh') {
        document.getElementById('nav-urchleh')?.classList.add('active');
    } else if (page === 'archlah') {
        document.getElementById('nav-archlah')?.classList.add('active');
    }
    
    // Update floating donate button visibility
    const floatingDonate = document.getElementById('floating-donate');
    if (page === 'donate') {
        floatingDonate.classList.add('hidden');
    } else {
        floatingDonate.classList.remove('hidden');
    }
    
    // Render the page
    renderPage(page);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render page content
function renderPage(page) {
    const mainContent = document.getElementById('main-content');
    
    switch(page) {
        case 'home':
            mainContent.innerHTML = getHomePage();
            break;
        case 'urchleh':
            mainContent.innerHTML = getUrchlehPage();
            initUrchlehPage();
            break;
        case 'archlah':
            mainContent.innerHTML = getArchlahPage();
            break;
        case 'donate':
            mainContent.innerHTML = getDonatePage();
            initDonatePage();
            break;
        default:
            mainContent.innerHTML = getHomePage();
    }
}

// Home Page HTML
function getHomePage() {
    return `
        <!-- Hero Section -->
        <section style="position: relative; padding: 5rem 1rem; overflow: hidden;">
            <div style="position: absolute; inset: 0; background: linear-gradient(to bottom right, rgba(254, 243, 199, 0.5), rgba(204, 251, 241, 0.5), rgba(254, 226, 226, 0.5));"></div>
            <div style="max-width: 1280px; margin: 0 auto; position: relative; z-index: 10;">
                <div style="display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center;">
                    <div style="text-align: center;">
                        <h1 style="font-size: 3rem; background: linear-gradient(to right, #d97706, #0d9488, #db2777); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; font-weight: 600;">
                            Хайрлах гэр бүл хайж байна
                        </h1>
                        <p style="font-size: 1.25rem; color: #374151; margin-bottom: 2rem;">
                            Таны шинэ найз залгамж чамайг хүлээж байна. Амьтдыг аврах, өрөвдөх, үрчлэх - бид хамтдаа илүү сайн ирээдүйг бүтээе.
                        </p>
                        <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
                            <button onclick="navigateTo('urchleh')" class="btn-primary">
                                <span>Үрчлэх</span>
                                <span>→</span>
                            </button>
                            <button onclick="navigateTo('donate')" class="btn-secondary">
                                Хандив өгөх
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="page-container">
            <div class="grid grid-4">
                <div class="card" style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🏡</div>
                    <div style="font-size: 2rem; background: linear-gradient(to right, #d97706, #0d9488); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; font-weight: 600;">
                        2,450+
                    </div>
                    <div style="color: #6b7280;">Үрчлэгдсэн</div>
                </div>
                <div class="card" style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
                    <div style="font-size: 2rem; background: linear-gradient(to right, #d97706, #0d9488); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; font-weight: 600;">
                        5,200+
                    </div>
                    <div style="color: #6b7280;">Хайгуул хийгдсэн</div>
                </div>
                <div class="card" style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">❤️</div>
                    <div style="font-size: 2rem; background: linear-gradient(to right, #d97706, #0d9488); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; font-weight: 600;">
                        350+
                    </div>
                    <div style="color: #6b7280;">Сайн дурын ажилтан</div>
                </div>
                <div class="card" style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🤝</div>
                    <div style="font-size: 2rem; background: linear-gradient(to right, #d97706, #0d9488); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; font-weight: 600;">
                        25+
                    </div>
                    <div style="color: #6b7280;">Түнш байгууллага</div>
                </div>
            </div>
        </section>

        <!-- Featured Pets -->
        <section class="page-container">
            <div class="page-header">
                <h2 class="page-title">Онцлох амьтад</h2>
                <p class="page-subtitle">Та үүнийг хайж байгаа бололтой</p>
            </div>
            <div class="grid grid-3">
                <div class="pet-card">
                    <div class="pet-image-container">
                        <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop" alt="Бэлла" class="pet-image">
                        <button class="pet-favorite-btn">
                            <svg class="heart-icon" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="pet-content">
                        <h3 class="pet-name">Бэлла</h3>
                        <div class="pet-info">
                            <div class="pet-info-item">
                                <span>🐕</span>
                                <span>Нохой</span>
                            </div>
                            <div class="pet-info-item">
                                <span>📅</span>
                                <span>2 жил</span>
                            </div>
                        </div>
                        <button class="pet-action-btn">Дэлгэрэнгүй</button>
                    </div>
                </div>
                <div class="pet-card">
                    <div class="pet-image-container">
                        <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop" alt="Мими" class="pet-image">
                        <button class="pet-favorite-btn">
                            <svg class="heart-icon" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="pet-content">
                        <h3 class="pet-name">Мими</h3>
                        <div class="pet-info">
                            <div class="pet-info-item">
                                <span>🐕</span>
                                <span>Муур</span>
                            </div>
                            <div class="pet-info-item">
                                <span>📅</span>
                                <span>1 жил</span>
                            </div>
                        </div>
                        <button class="pet-action-btn">Дэлгэрэнгүй</button>
                    </div>
                </div>
                <div class="pet-card">
                    <div class="pet-image-container">
                        <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop" alt="Макс" class="pet-image">
                        <button class="pet-favorite-btn">
                            <svg class="heart-icon" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="pet-content">
                        <h3 class="pet-name">Макс</h3>
                        <div class="pet-info">
                            <div class="pet-info-item">
                                <span>🐕</span>
                                <span>Нохой</span>
                            </div>
                            <div class="pet-info-item">
                                <span>📅</span>
                                <span>3 жил</span>
                            </div>
                        </div>
                        <button class="pet-action-btn">Дэлгэрэнгүй</button>
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 3rem;">
                <button onclick="navigateTo('urchleh')" style="padding: 1rem 2rem; background: linear-gradient(to right, #f472b6, #fbbf24); color: white; border: none; border-radius: 9999px; cursor: pointer; font-size: 1rem; font-weight: 500; box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15); transition: all 0.2s;">
                    Бүх амьтдыг харах →
                </button>
            </div>
        </section>

        <!-- How It Works -->
        <section style="padding: 4rem 1rem; background: linear-gradient(to bottom right, rgba(254, 243, 199, 0.5), rgba(204, 251, 241, 0.5));">
            <div class="page-container">
                <div class="page-header">
                    <h2 class="page-title">Хэрхэн ажилладаг вэ?</h2>
                </div>
                <div class="grid grid-3">
                    <div style="text-align: center;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(to bottom right, #fbbf24, #5eead4); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); font-size: 2.5rem;">
                            🔍
                        </div>
                        <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 0.75rem; font-weight: 600;">1. Хайх</h3>
                        <p style="color: #6b7280;">Таны амьдралын хэв маягт тохирсон төгс хань амьтныг олоорой</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(to bottom right, #5eead4, #f472b6); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); font-size: 2.5rem;">
                            ❤️
                        </div>
                        <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 0.75rem; font-weight: 600;">2. Уулзах</h3>
                        <p style="color: #6b7280;">Шинэ найзтайгаа танилцаж, харилцан ойлголцох эсэхээ шалгаарай</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(to bottom right, #f472b6, #fbbf24); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); font-size: 2.5rem;">
                            🏡
                        </div>
                        <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 0.75rem; font-weight: 600;">3. Үрчлэх</h3>
                        <p style="color: #6b7280;">Гэрээ дүүргэж, шинэ амьдралаа эхлүүлээрэй</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="page-container">
            <div style="max-width: 56rem; margin: 0 auto;">
                <div style="background: linear-gradient(to right, #fbbf24, #5eead4, #f472b6); border-radius: 1.5rem; padding: 3rem; text-align: center; box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);">
                    <h2 style="font-size: 2.5rem; color: white; margin-bottom: 1.5rem; font-weight: 600;">
                        Өнөөдөр амьдралыг өөрчил
                    </h2>
                    <p style="font-size: 1.25rem; color: rgba(255, 255, 255, 0.9); margin-bottom: 2rem;">
                        Амьтан үрчлэх нь хоёр амьдралыг аврах явдал юм - таны болон тэдний
                    </p>
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;">
                        <button onclick="navigateTo('urchleh')" style="padding: 1rem 2rem; background: white; color: #374151; border: none; border-radius: 9999px; cursor: pointer; font-size: 1rem; font-weight: 500; box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15); transition: all 0.2s;">
                            Үрчлэх эхлүүлэх
                        </button>
                        <button onclick="navigateTo('archlah')" style="padding: 1rem 2rem; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(12px); color: white; border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 9999px; cursor: pointer; font-size: 1rem; font-weight: 500; transition: all 0.2s;">
                            Үйлчилгээний тухай
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Urchleh Page HTML
function getUrchlehPage() {
    const pets = [
        { id: 1, name: 'Бэлла', type: 'Нохой', breed: 'Голден Ретривер', age: '2 жил', ageGroup: 'adult', size: 'large', gender: 'Эм', location: 'Улаанбаатар', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop', description: 'Энэргитэй, найрсаг бөгөөд хүүхдүүдтэй маш сайн харьцдаг.' },
        { id: 2, name: 'Мими', type: 'Муур', breed: 'Британи богино үст', age: '1 жил', ageGroup: 'young', size: 'medium', gender: 'Эм', location: 'Улаанбаатар', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop', description: 'Тайван, хайраар дүүрэн сайхан муур.' },
        { id: 3, name: 'Макс', type: 'Нохой', breed: 'Лабрадор', age: '3 жил', ageGroup: 'adult', size: 'large', gender: 'Эр', location: 'Дархан', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', description: 'Сургуулилттай, итгэлтэй гэр бүлийн найз.' },
        { id: 4, name: 'Луна', type: 'Муур', breed: 'Сиам', age: '6 сар', ageGroup: 'baby', size: 'small', gender: 'Эм', location: 'Улаанбаатар', image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=400&fit=crop', description: 'Идэвхтэй, тоглох дуртай муурын зулзага.' },
        { id: 5, name: 'Чарли', type: 'Нохой', breed: 'Бигл', age: '4 жил', ageGroup: 'adult', size: 'medium', gender: 'Эр', location: 'Эрдэнэт', image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=400&fit=crop', description: 'Найрсаг, зөөлөн ааштай гайхалтай нөхөр.' },
        { id: 6, name: 'Коко', type: 'Муур', breed: 'Перс', age: '5 жил', ageGroup: 'adult', size: 'medium', gender: 'Эм', location: 'Улаанбаатар', image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400&h=400&fit=crop', description: 'Тайван, царай сайтай гоё муур.' },
        { id: 7, name: 'Рокки', type: 'Нохой', breed: 'Герман Харуул', age: '2 жил', ageGroup: 'adult', size: 'large', gender: 'Эр', location: 'Улаанбаатар', image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=400&fit=crop', description: 'Зоригтой, ухаантай харуул нохой.' },
        { id: 8, name: 'Мөнх', type: 'Муур', breed: 'Монгол муур', age: '7 сар', ageGroup: 'baby', size: 'small', gender: 'Эр', location: 'Дархан', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop', description: 'Өөдрөг, тоглох дуртай залуу муур.' },
    ];

    const petsHTML = pets.map(pet => `
        <div class="pet-card" data-type="${pet.type}" data-age="${pet.ageGroup}" data-size="${pet.size}">
            <div class="pet-image-container">
                <img src="${pet.image}" alt="${pet.name}" class="pet-image">
                <button class="pet-favorite-btn">
                    <svg class="heart-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <div style="position: absolute; bottom: 1rem; left: 1rem; padding: 0.25rem 0.75rem; background: linear-gradient(to right, #fbbf24, #5eead4); color: white; border-radius: 9999px; font-size: 0.875rem;">
                    ${pet.type}
                </div>
            </div>
            <div class="pet-content">
                <h3 class="pet-name">${pet.name}</h3>
                <p class="pet-breed">${pet.breed}</p>
                <div class="pet-info">
                    <div class="pet-info-item">
                        <span>📅</span>
                        <span>${pet.age} • ${pet.gender}</span>
                    </div>
                    <div class="pet-info-item">
                        <span>📍</span>
                        <span>${pet.location}</span>
                    </div>
                </div>
                <p class="pet-description">${pet.description}</p>
                <button class="pet-action-btn">Дэлгэрэнгүй</button>
            </div>
        </div>
    `).join('');

    return `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">Үрчлэхэд бэлэн амьтад</h1>
                <p class="page-subtitle">Таны шинэ найз найз залгамжийг хүлээж байна</p>
            </div>

            <!-- Search and Filter -->
            <div class="card" style="margin-bottom: 2rem;">
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="flex: 1; position: relative;">
                        <input type="text" id="search-input" placeholder="Нэр эсвэл үүлдэр хайх..." 
                            style="width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e5e7eb; border-radius: 0.75rem; font-size: 1rem;">
                        <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.25rem;">🔍</span>
                    </div>
                    <button id="filter-toggle-btn" onclick="toggleFilters()" class="btn-primary">
                        🔧 Шүүлтүүр
                    </button>
                </div>

                <!-- Filters -->
                <div id="filters-section" class="hidden" style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                    <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
                        <div>
                            <label style="display: block; color: #374151; margin-bottom: 0.5rem; font-weight: 500;">Төрөл</label>
                            <select id="filter-type" style="width: 100%; padding: 0.75rem 1rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e5e7eb; border-radius: 0.75rem; font-size: 1rem;">
                                <option value="all">Бүгд</option>
                                <option value="Нохой">Нохой</option>
                                <option value="Муур">Муур</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; color: #374151; margin-bottom: 0.5rem; font-weight: 500;">Нас</label>
                            <select id="filter-age" style="width: 100%; padding: 0.75rem 1rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e5e7eb; border-radius: 0.75rem; font-size: 1rem;">
                                <option value="all">Бүгд</option>
                                <option value="baby">Зулзага (0-1 жил)</option>
                                <option value="young">Залуу (1-3 жил)</option>
                                <option value="adult">Насанд хүрсэн (3+ жил)</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; color: #374151; margin-bottom: 0.5rem; font-weight: 500;">Хэмжээ</label>
                            <select id="filter-size" style="width: 100%; padding: 0.75rem 1rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e5e7eb; border-radius: 0.75rem; font-size: 1rem;">
                                <option value="all">Бүгд</option>
                                <option value="small">Жижиг</option>
                                <option value="medium">Дунд</option>
                                <option value="large">Том</option>
                            </select>
                        </div>
                    </div>
                    <button id="clear-filters-btn" onclick="clearFilters()" class="hidden" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #e5e7eb; color: #374151; border: none; border-radius: 0.5rem; cursor: pointer;">
                        ✕ Шүүлтүүр арилгах
                    </button>
                </div>
            </div>

            <!-- Results Count -->
            <div style="margin-bottom: 1.5rem;">
                <p style="color: #6b7280;">
                    <span id="results-count" style="font-size: 1.5rem; background: linear-gradient(to right, #d97706, #0d9488); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-weight: 600;">8</span>
                    амьтан олдсон
                </p>
            </div>

            <!-- Pet Grid -->
            <div id="pets-grid" class="grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
                ${petsHTML}
            </div>

            <!-- No Results -->
            <div id="no-results" class="hidden" style="text-align: center; padding: 5rem 1rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🐾</div>
                <h3 style="font-size: 1.5rem; color: #374151; margin-bottom: 0.5rem; font-weight: 600;">Амьтан олдсонгүй</h3>
                <p style="color: #6b7280; margin-bottom: 1.5rem;">Шүүлтүүрээ өөрчилж дахин оролдоод үзнэ үү</p>
                <button onclick="clearFilters()" class="btn-primary">Бүх шүүлтүүрийг арилгах</button>
            </div>
        </div>
    `;
}

// Initialize Urchleh Page
function initUrchlehPage() {
    const searchInput = document.getElementById('search-input');
    const filterType = document.getElementById('filter-type');
    const filterAge = document.getElementById('filter-age');
    const filterSize = document.getElementById('filter-size');
    
    const applyFilters = () => {
        const searchQuery = searchInput.value.toLowerCase();
        const typeFilter = filterType.value;
        const ageFilter = filterAge.value;
        const sizeFilter = filterSize.value;
        
        const petCards = document.querySelectorAll('.pet-card');
        let visibleCount = 0;
        
        petCards.forEach(card => {
            const type = card.dataset.type;
            const age = card.dataset.age;
            const size = card.dataset.size;
            const name = card.querySelector('.pet-name').textContent.toLowerCase();
            const breed = card.querySelector('.pet-breed').textContent.toLowerCase();
            
            const matchesSearch = searchQuery === '' || name.includes(searchQuery) || breed.includes(searchQuery);
            const matchesType = typeFilter === 'all' || type === typeFilter;
            const matchesAge = ageFilter === 'all' || age === ageFilter;
            const matchesSize = sizeFilter === 'all' || size === sizeFilter;
            
            if (matchesSearch && matchesType && matchesAge && matchesSize) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        document.getElementById('results-count').textContent = visibleCount;
        
        if (visibleCount === 0) {
            document.getElementById('pets-grid').classList.add('hidden');
            document.getElementById('no-results').classList.remove('hidden');
        } else {
            document.getElementById('pets-grid').classList.remove('hidden');
            document.getElementById('no-results').classList.add('hidden');
        }
        
        // Show/hide clear button
        if (typeFilter !== 'all' || ageFilter !== 'all' || sizeFilter !== 'all') {
            document.getElementById('clear-filters-btn').classList.remove('hidden');
        } else {
            document.getElementById('clear-filters-btn').classList.add('hidden');
        }
    };
    
    searchInput.addEventListener('input', applyFilters);
    filterType.addEventListener('change', applyFilters);
    filterAge.addEventListener('change', applyFilters);
    filterSize.addEventListener('change', applyFilters);
}

function toggleFilters() {
    const filtersSection = document.getElementById('filters-section');
    filtersSection.classList.toggle('hidden');
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-type').value = 'all';
    document.getElementById('filter-age').value = 'all';
    document.getElementById('filter-size').value = 'all';
    
    document.querySelectorAll('.pet-card').forEach(card => {
        card.style.display = 'block';
    });
    
    document.getElementById('results-count').textContent = document.querySelectorAll('.pet-card').length;
    document.getElementById('pets-grid').classList.remove('hidden');
    document.getElementById('no-results').classList.add('hidden');
    document.getElementById('clear-filters-btn').classList.add('hidden');
}

// Archlah Page HTML
function getArchlahPage() {
    return `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">Манай үйлчилгээ</h1>
                <p class="page-subtitle">Таны хайрт тэжээвэр амьтанд бүрэн хүрээний, хайраар дүүрэн арчилгаа үзүүлэх</p>
            </div>

            <!-- Main Services -->
            <div class="grid grid-2" style="margin-bottom: 4rem;">
                <div class="card">
                    <div style="width: 64px; height: 64px; background: linear-gradient(to right, #fbbf24, #5eead4); border-radius: 1rem; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-size: 2rem;">
                        🏥
                    </div>
                    <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 0.75rem; font-weight: 600;">Эмнэлгийн үйлчилгээ</h3>
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">Бүрэн хүрээний эрүүл мэндийн үзлэг, вакцинжуулалт болон эмчилгээ</p>
                    <ul style="list-style: none; margin-bottom: 1.5rem;">
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #fbbf24, #5eead4); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Жилийн эрүүл мэндийн үзлэг
                        </li>
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #fbbf24, #5eead4); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Вакцин ба шавьж устгах
                        </li>
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #fbbf24, #5eead4); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Яаралтай тусламж
                        </li>
                        <li style="display: flex; align-items: center; color: #374151;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #fbbf24, #5eead4); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Мэс засал
                        </li>
                    </ul>
                    <button class="pet-action-btn">Дэлгэрэнгүй</button>
                </div>

                <div class="card">
                    <div style="width: 64px; height: 64px; background: linear-gradient(to right, #5eead4, #f472b6); border-radius: 1rem; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-size: 2rem;">
                        ✂️
                    </div>
                    <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 0.75rem; font-weight: 600;">Үс засалт ба арчилгаа</h3>
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">Мэргэжлийн арчилгааны үйлчилгээ таны тэжээвэр амьтныг сайхан харагдуулна</p>
                    <ul style="list-style: none; margin-bottom: 1.5rem;">
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #5eead4, #f472b6); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Үс засалт ба угаалга
                        </li>
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #5eead4, #f472b6); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Хумс зүсэлт
                        </li>
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #5eead4, #f472b6); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Сууралтай үржлийн арчилгаа
                        </li>
                        <li style="display: flex; align-items: center; color: #374151;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #5eead4, #f472b6); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Арьс арчилгаа
                        </li>
                    </ul>
                    <button class="pet-action-btn">Дэлгэрэнгүй</button>
                </div>

                <div class="card">
                    <div style="width: 64px; height: 64px; background: linear-gradient(to right, #f472b6, #fbbf24); border-radius: 1rem; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-size: 2rem;">
                        🎓
                    </div>
                    <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 0.75rem; font-weight: 600;">Сургалт</h3>
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">Мэргэжлийн сургагч нартай зан үйл болон итгэлцлийн сургалт</p>
                    <ul style="list-style: none; margin-bottom: 1.5rem;">
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #f472b6, #fbbf24); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Үндсэн дуулгавартай байх сургалт
                        </li>
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #f472b6, #fbbf24); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Зан үйлийн сүлжээ
                        </li>
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #f472b6, #fbbf24); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Нийгэмшүүлэх ангиуд
                        </li>
                        <li style="display: flex; align-items: center; color: #374151;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #f472b6, #fbbf24); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Нэг бүрчилсэн сургалт
                        </li>
                    </ul>
                    <button class="pet-action-btn">Дэлгэрэнгүй</button>
                </div>

                <div class="card">
                    <div style="width: 64px; height: 64px; background: linear-gradient(to right, #fbbf24, #f472b6); border-radius: 1rem; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-size: 2rem;">
                        🏠
                    </div>
                    <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 0.75rem; font-weight: 600;">Хамгаалалт ба үрчлэлт</h3>
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">Гэр хайж буй амьтдад аюулгүй орон байр болон үрчлэлтийн үйлчилгээ</p>
                    <ul style="list-style: none; margin-bottom: 1.5rem;">
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #fbbf24, #f472b6); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Түр асаргаа
                        </li>
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #fbbf24, #f472b6); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Үрчлэлтийн үйлчилгээ
                        </li>
                        <li style="display: flex; align-items: center; color: #374151; margin-bottom: 0.75rem;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #fbbf24, #f472b6); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Үрчлэлтийн дараах дэмжлэг
                        </li>
                        <li style="display: flex; align-items: center; color: #374151;">
                            <div style="width: 8px; height: 8px; background: linear-gradient(to right, #fbbf24, #f472b6); border-radius: 50%; margin-right: 0.75rem;"></div>
                            Эмнэлгийн анхан шатны үзлэг
                        </li>
                    </ul>
                    <button class="pet-action-btn">Дэлгэрэнгүй</button>
                </div>
            </div>

            <!-- Additional Services -->
            <div style="margin-bottom: 4rem;">
                <h2 style="font-size: 2.5rem; text-align: center; background: linear-gradient(to right, #d97706, #0d9488); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 3rem; font-weight: 600;">
                    Нэмэлт үйлчилгээ
                </h2>
                <div class="grid grid-3">
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏨</div>
                        <h3 style="font-size: 1.25rem; color: #1f2937; margin-bottom: 0.5rem; font-weight: 600;">Зочид буудал ба байр</h3>
                        <p style="color: #6b7280; font-size: 0.875rem;">Та замд байхад найрсаг, аюулгүй орчин</p>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🍖</div>
                        <h3 style="font-size: 1.25rem; color: #1f2937; margin-bottom: 0.5rem; font-weight: 600;">Хооллолтын зөвлөгөө</h3>
                        <p style="color: #6b7280; font-size: 0.875rem;">Таны тэжээвэр амьтны хэрэгцээнд тохирсон тусгай хооллолтын төлөвлөлт</p>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🧪</div>
                        <h3 style="font-size: 1.25rem; color: #1f2937; margin-bottom: 0.5rem; font-weight: 600;">Лабораторийн үйлчилгээ</h3>
                        <p style="color: #6b7280; font-size: 0.875rem;">Дотоод шинжилгээ болон оношлогоо</p>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">💊</div>
                        <h3 style="font-size: 1.25rem; color: #1f2937; margin-bottom: 0.5rem; font-weight: 600;">Эм тариа</h3>
                        <p style="color: #6b7280; font-size: 0.875rem;">Таны тэжээвэр амьтны эрүүл мэндэд шаардлагатай бүх эм</p>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🦷</div>
                        <h3 style="font-size: 1.25rem; color: #1f2937; margin-bottom: 0.5rem; font-weight: 600;">Шүдний арчилгаа</h3>
                        <p style="color: #6b7280; font-size: 0.875rem;">Шүдний цэвэрлэгээ болон амны хөндийн эрүүл мэнд</p>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔬</div>
                        <h3 style="font-size: 1.25rem; color: #1f2937; margin-bottom: 0.5rem; font-weight: 600;">Микрочип</h3>
                        <p style="color: #6b7280; font-size: 0.875rem;">Тэжээвэр амьтнаа таних болон хамгаалах үйлчилгээ</p>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div style="background: linear-gradient(to right, #fbbf24, #5eead4, #f472b6); border-radius: 1.5rem; padding: 3rem; box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);">
                <div style="max-width: 56rem; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; color: white; text-align: center; margin-bottom: 2rem; font-weight: 600;">
                        Өнөөдөр цаг товлох уу?
                    </h2>
                    <div class="grid grid-3" style="margin-bottom: 2rem;">
                        <div style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(12px); border-radius: 1rem; padding: 1.5rem; text-align: center; border: 1px solid rgba(255, 255, 255, 0.3);">
                            <div style="font-size: 2rem; color: white; margin-bottom: 0.75rem;">📞</div>
                            <p style="color: white; margin-bottom: 0.25rem;">Утас</p>
                            <p style="color: rgba(255, 255, 255, 0.9);">+976 8888-8888</p>
                        </div>
                        <div style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(12px); border-radius: 1rem; padding: 1.5rem; text-align: center; border: 1px solid rgba(255, 255, 255, 0.3);">
                            <div style="font-size: 2rem; color: white; margin-bottom: 0.75rem;">📧</div>
                            <p style="color: white; margin-bottom: 0.25rem;">Имэйл</p>
                            <p style="color: rgba(255, 255, 255, 0.9);">info@petrescue.mn</p>
                        </div>
                        <div style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(12px); border-radius: 1rem; padding: 1.5rem; text-align: center; border: 1px solid rgba(255, 255, 255, 0.3);">
                            <div style="font-size: 2rem; color: white; margin-bottom: 0.75rem;">🕐</div>
                            <p style="color: white; margin-bottom: 0.25rem;">Цагийн хуваарь</p>
                            <p style="color: rgba(255, 255, 255, 0.9);">09:00 - 18:00</p>
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <button style="padding: 1rem 2rem; background: white; color: #374151; border: none; border-radius: 9999px; cursor: pointer; font-size: 1.125rem; font-weight: 500; box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15); transition: all 0.2s;">
                            Цаг товлох
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Donate Page HTML
function getDonatePage() {
    return `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">Хандив өгөх</h1>
                <p class="page-subtitle">Таны хандив амьтдын амьдралыг өөрчилж, шинэ гэр олоход нь тусалдаг</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr; gap: 2rem; margin-bottom: 4rem;">
                <!-- Donation Form -->
                <div class="card">
                    <div id="donation-form">
                        <!-- Monthly Toggle -->
                        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;">
                            <button id="one-time-btn" onclick="setDonationType('one-time')" class="donation-type-btn active" style="padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-size: 1rem; font-weight: 500; border-radius: 9999px 0 0 9999px; background: linear-gradient(to right, #fbbf24, #5eead4); color: white;">
                                Нэг удаагийн
                            </button>
                            <button id="monthly-btn" onclick="setDonationType('monthly')" class="donation-type-btn" style="padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-size: 1rem; font-weight: 500; border-radius: 0 9999px 9999px 0; background: rgba(255, 255, 255, 0.5); color: #374151;">
                                Сар бүр
                            </button>
                        </div>

                        <!-- Preset Amounts -->
                        <div style="margin-bottom: 2rem;">
                            <label style="display: block; color: #374151; margin-bottom: 1rem; font-size: 1.125rem; font-weight: 500;">Дүн сонгох</label>
                            <div class="grid grid-3">
                                <button onclick="selectAmount(10000)" class="amount-btn" data-amount="10000">10,000₮</button>
                                <button onclick="selectAmount(25000)" class="amount-btn" data-amount="25000">25,000₮</button>
                                <button onclick="selectAmount(50000)" class="amount-btn" data-amount="50000">50,000₮</button>
                                <button onclick="selectAmount(100000)" class="amount-btn" data-amount="100000">100,000₮</button>
                                <button onclick="selectAmount(250000)" class="amount-btn" data-amount="250000">250,000₮</button>
                                <button onclick="selectAmount(500000)" class="amount-btn" data-amount="500000">500,000₮</button>
                            </div>
                        </div>

                        <!-- Custom Amount -->
                        <div style="margin-bottom: 2rem;">
                            <label style="display: block; color: #374151; margin-bottom: 0.5rem; font-size: 1.125rem; font-weight: 500;">Эсвэл өөр дүн оруулах</label>
                            <div style="position: relative;">
                                <input type="number" id="custom-amount" placeholder="Дүн оруулах..." oninput="selectCustomAmount()"
                                    style="width: 100%; padding: 1rem 3rem 1rem 1.5rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e5e7eb; border-radius: 0.75rem; font-size: 1.125rem;">
                                <span style="position: absolute; right: 1.5rem; top: 50%; transform: translateY(-50%); color: #6b7280; font-size: 1.125rem;">₮</span>
                            </div>
                        </div>

                        <!-- Impact Preview -->
                        <div id="impact-preview" class="hidden" style="margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(to bottom right, rgba(254, 243, 199, 0.5), rgba(204, 251, 241, 0.5)); border-radius: 1rem; border: 1px solid #fbbf24;">
                            <h3 style="font-size: 1.125rem; color: #1f2937; margin-bottom: 0.75rem; display: flex; align-items: center; font-weight: 600;">
                                <span style="margin-right: 0.5rem;">❤️</span>
                                Таны хандивын нөлөөлөл
                            </h3>
                            <div id="impact-list" style="color: #374151;"></div>
                        </div>

                        <!-- Donate Button -->
                        <button id="donate-btn" onclick="submitDonation()" disabled
                            style="width: 100%; padding: 1rem; border-radius: 0.75rem; font-size: 1.125rem; font-weight: 500; border: none; cursor: pointer; background: #e5e7eb; color: #9ca3af;">
                            Одоо 0₮ хандивлах
                        </button>
                    </div>

                    <!-- Thank You Message -->
                    <div id="thank-you-message" class="hidden" style="text-align: center; padding: 3rem 1rem;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(to bottom right, #fbbf24, #5eead4); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); font-size: 3rem;">
                            ✓
                        </div>
                        <h3 style="font-size: 2rem; color: #1f2937; margin-bottom: 1rem; font-weight: 600;">Баярлалаа! 🎉</h3>
                        <p style="font-size: 1.25rem; color: #6b7280;">
                            Таны өгөөмөр хандив олон амьтдын амьдралыг өөрчлөх болно
                        </p>
                    </div>
                </div>
            </div>

            <!-- Impact Stats -->
            <div style="margin-bottom: 4rem;">
                <h2 class="page-title">Бидний нөлөөлөл</h2>
                <div class="grid grid-4">
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🏥</div>
                        <div style="font-size: 2rem; background: linear-gradient(to right, #d97706, #0d9488); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; font-weight: 600;">1,250</div>
                        <div style="color: #374151; margin-bottom: 0.25rem;">Эмчлүүлсэн</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">Энэ сард</div>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🍖</div>
                        <div style="font-size: 2rem; background: linear-gradient(to right, #d97706, #0d9488); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; font-weight: 600;">3,840</div>
                        <div style="color: #374151; margin-bottom: 0.25rem;">Хооллосон</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">Энэ сард</div>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🏠</div>
                        <div style="font-size: 2rem; background: linear-gradient(to right, #d97706, #0d9488); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; font-weight: 600;">156</div>
                        <div style="color: #374151; margin-bottom: 0.25rem;">Үрчлэгдсэн</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">Энэ сард</div>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">💉</div>
                        <div style="font-size: 2rem; background: linear-gradient(to right, #d97706, #0d9488); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; font-weight: 600;">892</div>
                        <div style="color: #374151; margin-bottom: 0.25rem;">Вакцинжуулсан</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">Энэ сард</div>
                    </div>
                </div>
            </div>

            <!-- Thank You -->
            <div style="background: linear-gradient(to right, #fbbf24, #5eead4, #f472b6); border-radius: 1.5rem; padding: 3rem; text-align: center; box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);">
                <h2 style="font-size: 2.5rem; color: white; margin-bottom: 1rem; font-weight: 600;">
                    Таны дэмжлэгт баярлалаа
                </h2>
                <p style="font-size: 1.25rem; color: rgba(255, 255, 255, 0.9); max-width: 42rem; margin: 0 auto;">
                    Таны өгөөмөр сэтгэлийн үр дүнд бид жил бүр мянга мянган амьтдын амьдралыг өөрчилж чадаж байна. Та бидний баатар!
                </p>
            </div>
        </div>
    `;
}

// Initialize Donate Page
let donationType = 'one-time';
let selectedDonationAmount = null;

function initDonatePage() {
    // Reset state
    donationType = 'one-time';
    selectedDonationAmount = null;
}

function setDonationType(type) {
    donationType = type;
    const oneTimeBtn = document.getElementById('one-time-btn');
    const monthlyBtn = document.getElementById('monthly-btn');
    
    if (type === 'one-time') {
        oneTimeBtn.style.background = 'linear-gradient(to right, #fbbf24, #5eead4)';
        oneTimeBtn.style.color = 'white';
        monthlyBtn.style.background = 'rgba(255, 255, 255, 0.5)';
        monthlyBtn.style.color = '#374151';
    } else {
        monthlyBtn.style.background = 'linear-gradient(to right, #fbbf24, #5eead4)';
        monthlyBtn.style.color = 'white';
        oneTimeBtn.style.background = 'rgba(255, 255, 255, 0.5)';
        oneTimeBtn.style.color = '#374151';
    }
    
    updateDonateButton();
}

function selectAmount(amount) {
    selectedDonationAmount = amount;
    document.getElementById('custom-amount').value = '';
    
    // Update button styles
    document.querySelectorAll('.amount-btn').forEach(btn => {
        if (parseInt(btn.dataset.amount) === amount) {
            btn.style.background = 'linear-gradient(to right, #fbbf24, #5eead4)';
            btn.style.color = 'white';
            btn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            btn.style.transform = 'scale(1.05)';
        } else {
            btn.style.background = 'rgba(255, 255, 255, 0.8)';
            btn.style.color = '#374151';
            btn.style.boxShadow = '';
            btn.style.transform = '';
        }
    });
    
    updateImpactPreview();
    updateDonateButton();
}

function selectCustomAmount() {
    const customAmount = parseInt(document.getElementById('custom-amount').value);
    if (customAmount && customAmount > 0) {
        selectedDonationAmount = customAmount;
        
        // Reset preset buttons
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.style.background = 'rgba(255, 255, 255, 0.8)';
            btn.style.color = '#374151';
            btn.style.boxShadow = '';
            btn.style.transform = '';
        });
        
        updateImpactPreview();
        updateDonateButton();
    } else {
        selectedDonationAmount = null;
        document.getElementById('impact-preview').classList.add('hidden');
        updateDonateButton();
    }
}

function updateImpactPreview() {
    if (!selectedDonationAmount) {
        document.getElementById('impact-preview').classList.add('hidden');
        return;
    }
    
    document.getElementById('impact-preview').classList.remove('hidden');
    
    let impacts = [];
    if (selectedDonationAmount >= 10000) {
        impacts.push(`<div style="display: flex; align-items: center; margin-bottom: 0.5rem;"><span style="margin-right: 0.5rem;">✓</span><span>${Math.floor(selectedDonationAmount / 10000)} амьтанд хоол хүнс</span></div>`);
    }
    if (selectedDonationAmount >= 25000) {
        impacts.push(`<div style="display: flex; align-items: center; margin-bottom: 0.5rem;"><span style="margin-right: 0.5rem;">✓</span><span>Эмнэлгийн үзлэг</span></div>`);
    }
    if (selectedDonationAmount >= 50000) {
        impacts.push(`<div style="display: flex; align-items: center; margin-bottom: 0.5rem;"><span style="margin-right: 0.5rem;">✓</span><span>Вакцинжуулалт</span></div>`);
    }
    if (selectedDonationAmount >= 100000) {
        impacts.push(`<div style="display: flex; align-items: center; margin-bottom: 0.5rem;"><span style="margin-right: 0.5rem;">✓</span><span>Мэс заслын туслалцаа</span></div>`);
    }
    
    document.getElementById('impact-list').innerHTML = impacts.join('');
}

function updateDonateButton() {
    const donateBtn = document.getElementById('donate-btn');
    
    if (selectedDonationAmount && selectedDonationAmount > 0) {
        donateBtn.disabled = false;
        donateBtn.style.background = 'linear-gradient(to right, #f472b6, #fbbf24)';
        donateBtn.style.color = 'white';
        donateBtn.style.cursor = 'pointer';
        donateBtn.textContent = `${donationType === 'monthly' ? 'Сар бүр' : 'Одоо'} ${selectedDonationAmount.toLocaleString()}₮ хандивлах`;
    } else {
        donateBtn.disabled = true;
        donateBtn.style.background = '#e5e7eb';
        donateBtn.style.color = '#9ca3af';
        donateBtn.style.cursor = 'not-allowed';
        donateBtn.textContent = 'Одоо 0₮ хандивлах';
    }
}

function submitDonation() {
    if (!selectedDonationAmount) return;
    
    document.getElementById('donation-form').classList.add('hidden');
    document.getElementById('thank-you-message').classList.remove('hidden');
    
    setTimeout(() => {
        document.getElementById('donation-form').classList.remove('hidden');
        document.getElementById('thank-you-message').classList.add('hidden');
        selectedDonationAmount = null;
        document.getElementById('custom-amount').value = '';
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.style.background = 'rgba(255, 255, 255, 0.8)';
            btn.style.color = '#374151';
            btn.style.boxShadow = '';
            btn.style.transform = '';
        });
        document.getElementById('impact-preview').classList.add('hidden');
        updateDonateButton();
    }, 3000);
}

// Amount button styling
const style = document.createElement('style');
style.textContent = `
    .amount-btn {
        padding: 1rem;
        background: rgba(255, 255, 255, 0.8);
        color: #374151;
        border: none;
        border-radius: 0.75rem;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        transition: all 0.2s;
    }
    .amount-btn:hover {
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Listen for hash changes
window.addEventListener('hashchange', handleHashChange);

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Handle initial hash or default to home
    handleHashChange();
});
