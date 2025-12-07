// --- Pet Data ---
const pets = [
  { name: "Баатар", type: "Нохой", age: 1, location: "Улаанбаатар", breed: "Монгол банхар", img: "../assets/pets/baatar.jpg" },
  { name: "Сүүнээ", type: "Муур", age: 3, location: "Дархан", breed: "Доместик шортхэйр", img: "../assets/pets/suunee.jpg" },
  { name: "Гарчиг", type: "Нохой", age: 4, location: "Эрдэнэт", breed: "Холимог", img: "../assets/pets/garshig.jpg" },
  { name: "Тэмүүжин", type: "Муур", age: 2, location: "Улаанбаатар", breed: "Доместик лонгхэйр", img: "../assets/pets/temuujin.jpg" },
];

// --- Selectors ---
const petGrid = document.getElementById("petGrid");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const ageFilter = document.getElementById("ageFilter");
const locationFilter = document.getElementById("locationFilter");
const resultCount = document.getElementById("resultCount");

// --- Display Cards ---
function displayPets(list) {
  petGrid.innerHTML = "";
  resultCount.textContent = list.length;

  list.forEach((pet) => {
    const card = document.createElement("div");
    card.classList.add("pet-card");

    card.innerHTML = `
      <img src="${pet.img}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>${pet.type} • ${pet.age} настай • ${pet.location}</p>
    `;

    petGrid.appendChild(card);
  });
}

// --- Filtering Logic ---
function filterPets() {
  const search = searchInput.value.toLowerCase();
  const type = typeFilter.value;
  const age = ageFilter.value;
  const location = locationFilter.value;

  const filtered = pets.filter((pet) => {
    const matchSearch =
      pet.name.toLowerCase().includes(search) ||
      pet.breed.toLowerCase().includes(search);

    const matchType = type === "all" || pet.type === type;
    const matchLocation = location === "all" || pet.location === location;

    const matchAge =
      age === "all" ||
      (age === "young" && pet.age < 2) ||
      (age === "adult" && pet.age >= 2 && pet.age <= 5) ||
      (age === "senior" && pet.age > 5);

    return matchSearch && matchType && matchLocation && matchAge;
  });

  displayPets(filtered);
}

// --- Event Listeners ---
searchInput.addEventListener("input", filterPets);
typeFilter.addEventListener("change", filterPets);
ageFilter.addEventListener("change", filterPets);
locationFilter.addEventListener("change", filterPets);

// --- Load Initial Data ---
displayPets(pets);
