const allPets = [
  {
    id: 1,
    name: "Найз",
    type: "Нохой",
    breed: "Алтан авирагч холимог",
    age: "3 нас",
    ageNum: 3,
    location: "Улаанбаатар",
    image: "https://images.unsplash.com/photo-1755426225487-62bb981301b9",
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
    image: "https://images.unsplash.com/photo-1544338673-d2efa1abb8d9",
    description: "Эгдүүтэй, тэврэлдэг муур, аашлах, тоглохдоо дуртай."
  }
  
];

const petGrid = document.getElementById("petGrid");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const ageFilter = document.getElementById("ageFilter");
const locationFilter = document.getElementById("locationFilter");
const resultCount = document.getElementById("resultCount");

function renderPets(pets) {
  petGrid.innerHTML = "";
  pets.forEach(pet => {
    const card = document.createElement("div");
    card.className = "pet-card";
    card.innerHTML = `
      <div class="pet-image-wrapper">
          <img src="${pet.image}" alt="${pet.name}" class="pet-image">
      </div>
      <div class="pet-content">
          <div class="pet-header">
              <h3 class="pet-name">${pet.name}</h3>
              <span class="badge">${pet.type}</span>
          </div>
          <p class="pet-breed">${pet.breed}</p>
          <p class="pet-location">${pet.location}</p>
          <p class="pet-description">${pet.description}</p>
          <button class="btn btn-primary">Өрхжүүлэх</button>
      </div>
    `;
    petGrid.appendChild(card);
  });
  resultCount.textContent = pets.length;
}

function filterPets() {
  let filtered = allPets.filter(pet => {
    const searchText = searchInput.value.toLowerCase();
    const matchesSearch = pet.name.toLowerCase().includes(searchText) ||
                          pet.breed.toLowerCase().includes(searchText);

    const matchesType = typeFilter.value === "all" || pet.type === typeFilter.value;
    const matchesLocation = locationFilter.value === "all" || pet.location === locationFilter.value;
    let matchesAge = true;
    if (ageFilter.value === "young") matchesAge = pet.ageNum < 2;
    else if (ageFilter.value === "adult") matchesAge = pet.ageNum >= 2 && pet.ageNum <= 5;
    else if (ageFilter.value === "senior") matchesAge = pet.ageNum > 5;

    return matchesSearch && matchesType && matchesAge && matchesLocation;
  });
  renderPets(filtered);
}

searchInput.addEventListener("input", filterPets);
typeFilter.addEventListener("change", filterPets);
ageFilter.addEventListener("change", filterPets);
locationFilter.addEventListener("change", filterPets);

renderPets(allPets);