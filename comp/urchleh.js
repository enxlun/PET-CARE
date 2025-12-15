function initUrchlehPage() {
  // reset state when page loads
  filteredPets = [...allPets];
  favorites.clear();

  // render pets
  renderPets();

  // attach listeners AFTER HTML exists
  document.getElementById('searchInput')?.addEventListener('input', filterPets);
  document.getElementById('typeFilter')?.addEventListener('change', filterPets);
  document.getElementById('ageFilter')?.addEventListener('change', filterPets);
  document.getElementById('locationFilter')?.addEventListener('change', filterPets);

  console.log('Urchleh page initialized ✅');
}

const allPets = [
  {
    id: 1,
    name: "Найз",
    type: "Нохой",
    breed: "Алтан авирагч холимог",
    age: "3 нас",
    ageNum: 3,
    location: "Улаанбаатар",
    image: "https://images.unsplash.com/photo-1755426225487-62bb981301b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1544338673-d2efa1abb8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Эгдүүтэй, тэврэлдэг муур."
  },
  {
    id: 3,
    name: "Макс",
    type: "Нохой",
    breed: "Хил колли",
    age: "5 нас",
    ageNum: 5,
    location: "Эрдэнэт",
    image: "https://images.unsplash.com/photo-1738109336833-c7560bd44d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Ухаантай, үнэнч хамтрагч."
  },
  {
    id: 4,
    name: "Гоо",
    type: "Муур",
    breed: "Перс холимог",
    age: "1 нас",
    ageNum: 1,
    location: "Чойбалсан",
    image: "https://images.unsplash.com/photo-1570824104967-27599c232b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Тоглоомон залуу муур."
  },
  {
    id: 5,
    name: "Чарли",
    type: "Нохой",
    breed: "Лабрадор холимог",
    age: "4 нас",
    ageNum: 4,
    location: "Ховд",
    image: "https://images.unsplash.com/photo-1738109336833-c7560bd44d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Эелдэг том нохой."
  },
  {
    id: 6,
    name: "Мило",
    type: "Муур",
    breed: "Судалтай",
    age: "6 нас",
    ageNum: 6,
    location: "Мөрөн",
    image: "https://images.unsplash.com/photo-1570824104967-27599c232b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Тайван, хайр татам муур."
  }
];

let filteredPets = [];
const favorites = new Set();

/* ---------- UI ---------- */

function createPetCard(pet) {
  return `
    <div class="pet-card">
      <div class="pet-image-wrapper">
        <img src="${pet.image}" class="pet-image" alt="${pet.name}">
        <button class="favorite-btn ${favorites.has(pet.id) ? 'active' : ''}" data-id="${pet.id}">♥</button>
      </div>
      <div class="pet-content">
        <h3>${pet.name}</h3>
        <p>${pet.breed} • ${pet.age}</p>
        <p>${pet.location}</p>
        <p>${pet.description}</p>
      </div>
    </div>
  `;
}

function renderPets() {
  const grid = document.getElementById('petGrid');
  const count = document.getElementById('resultCount');

  if (!grid) return;

  grid.innerHTML = filteredPets.map(createPetCard).join('');
  count.textContent = filteredPets.length;

  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.onclick = () => toggleFavorite(+btn.dataset.id);
  });
}

/* ---------- LOGIC ---------- */

function toggleFavorite(id) {
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  renderPets();
}

function filterPets() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const type = document.getElementById('typeFilter').value;
  const age = document.getElementById('ageFilter').value;
  const loc = document.getElementById('locationFilter').value;

  filteredPets = allPets.filter(p => {
    const s = p.name.toLowerCase().includes(search) || p.breed.toLowerCase().includes(search);
    const t = type === 'all' || p.type === type;
    const l = loc === 'all' || p.location === loc;
    const a =
      age === 'all' ||
      (age === 'young' && p.ageNum <= 2) ||
      (age === 'adult' && p.ageNum > 2 && p.ageNum <= 5) ||
      (age === 'senior' && p.ageNum > 5);

    return s && t && l && a;
  });

  renderPets();
}
