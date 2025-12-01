const allPets = [
  {
    id: 1,
    name: "Найз",
    type: "Нохой",
    breed: "Алтан авирагч холимог",
    age: "3 нас",
    ageNum: 3,
    location: "Улаанбаатар",
    image: "https://images.unsplash.com/photo-1755426225487-62bb981301b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBwYXN0ZWwlMjBzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTkxMTQ2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Найрсаг, эрч хүчтэй нохой идэвхтэй гэр бүлийг хайж байна."
  },
  {
    id: 2,
    name: "Сар",
    type: "Муур",
    breed: "Гэрийн богино үстэй",
    age: "2 нас",
    ageNum: 2,
    location: "Дархан",
    image: "https://images.unsplash.com/photo-1544338673-d2efa1abb8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwb3J0cmFpdCUyMGNsZWFuJTIwYmFja2dyb3VuZCUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzU5MTE0Njg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Эгдүүтэй, тэврэлдэг муур, аашлах, тоглохдоо дуртай."
  },
  {
    id: 3,
    name: "Макс",
    type: "Нохой",
    breed: "Хил колли",
    age: "5 нас",
    ageNum: 5,
    location: "Эрдэнэт",
    image: "https://images.unsplash.com/photo-1738109336833-c7560bd44d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMGFkb3B0aW9ufGVufDF8fHx8MTc1OTExMzE1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Ухаантай, үнэнч хамтрагч, гадаа аялалд төгс тохирно."
  }
];

let filteredPets = [...allPets];
const favorites = new Set();

// Create pet card HTML
function createPetCard(pet) {
    return `
        <div class="pet-card" data-pet-id="${pet.id}">
            <div class="pet-image-wrapper">
                <img src="${pet.image}" alt="${pet.name}" class="pet-image">
                <button class="favorite-btn ${favorites.has(pet.id) ? 'active' : ''}" data-pet-id="${pet.id}">
                    <svg class="icon" fill="${favorites.has(pet.id) ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="pet-content">
                <div class="pet-header">
                    <h3 class="pet-name">${pet.name}</h3>
                    <span class="badge">${pet.type}</span>
                </div>
                <p class="pet-breed">${pet.breed} • ${pet.age}</p>
                <div class="pet-location">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${pet.location}
                </div>
                <p class="pet-description">${pet.description}</p>
                <button class="btn btn-primary">Дэлгэрэнгүй</button>
            </div>
        </div>
    `;
}

// Render pet grid
function renderPets() {
    const petGrid = document.getElementById('petGrid');
    petGrid.innerHTML = filteredPets.map(pet => createPetCard(pet)).join('');
    document.getElementById('resultCount').textContent = filteredPets.length;

    // Add favorite button listeners
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', toggleFavorite);
    });
}

// Toggle favorite
function toggleFavorite(e) {
    e.stopPropagation();
    const petId = parseInt(e.currentTarget.dataset.petId);
    
    if (favorites.has(petId)) {
        favorites.delete(petId);
    } else {
        favorites.add(petId);
    }
    
    renderPets();
}

// Filter pets
function filterPets() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const ageFilter = document.getElementById('ageFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;

    filteredPets = allPets.filter(pet => {
        // Search filter
        const matchesSearch = pet.name.toLowerCase().includes(searchTerm) || 
                            pet.breed.toLowerCase().includes(searchTerm);

        // Type filter
        const matchesType = typeFilter === 'all' || pet.type === typeFilter;

        // Age filter
        let matchesAge = true;
        if (ageFilter === 'young') matchesAge = pet.ageNum <= 2;
        else if (ageFilter === 'adult') matchesAge = pet.ageNum > 2 && pet.ageNum <= 5;
        else if (ageFilter === 'senior') matchesAge = pet.ageNum > 5;

        // Location filter
        const matchesLocation = locationFilter === 'all' || pet.location === locationFilter;

        return matchesSearch && matchesType && matchesAge && matchesLocation;
    });

    renderPets();
}


document.getElementById('searchInput').addEventListener('input', filterPets);
document.getElementById('typeFilter').addEventListener('change', filterPets);
document.getElementById('ageFilter').addEventListener('change', filterPets);
document.getElementById('locationFilter').addEventListener('change', filterPets);

// Initial render
renderPets();

// --- TYPE SWITCH LOGIC ---
const typeSwitch = document.getElementById("mySwitch");

typeSwitch.addEventListener("change", () => {
    const typeFilterValue = typeSwitch.checked ? "Муур" : "Нохой";
    filterPets(typeFilterValue);
});
