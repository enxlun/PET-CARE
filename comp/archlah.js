function initArchlahPage() {
  renderServices();
  console.log('Archlah page initialized');
}


const services = [
  {
    id: 1,
    title: "Мал эмнэлгийн үйлчилгээ",
    description: "Мэргэжлийн малын эмч нар аврагдсан амьтдад иж бүрэн эрүүл мэндийн үзлэг, эмчилгээ хийдэг.",
    icon: serviceIconVet(),
    features: [
      "Ерөнхий эрүүл мэндийн үзлэг",
      "Вакцинжуулалт болон эмчилгээ",
      "Мэс засал ба халдваргүйжүүлэлт",
      "Яаралтай тусламж"
    ],
    buttonText: "Захиалах"
  },
  {
    id: 2,
    title: "Сайн дурын хөтөлбөр",
    description: "Амьтдын амьдралд эерэг өөрчлөлт авчрах боломж.",
    icon: serviceIconVolunteer(),
    features: [
      "Өдөр тутмын арчилгаа",
      "Олон нийтийн ажил",
      "Арга хэмжээ",
      "Амьтанд анхаарал тавих"
    ],
    buttonText: "Нэгдэх"
  },
  {
    id: 3,
    title: "Түр асаргаа",
    description: "Мөнх гэр олох хүртэл түр асрах.",
    icon: serviceIconFoster(),
    features: [
      "Бүх хэрэгцээ хангагдана",
      "Малын эмчийн дэмжлэг",
      "Сургалт",
      "Нийгэмшүүлэх"
    ],
    buttonText: "Дэлгэрэнгүй"
  }
];


function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  grid.innerHTML = services.map(s => `
    <div class="service-card" data-id="${s.id}">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <ul>
        ${s.features.map(f => `<li>✔ ${f}</li>`).join('')}
      </ul>
      <button class="btn btn-outline" data-action="${s.id}">
        ${s.buttonText}
      </button>
    </div>
  `).join('');

  // Card click
  document.querySelectorAll('.service-card').forEach(card => {
    card.onclick = () => viewServiceDetails(+card.dataset.id);
  });

  // Button click
  document.querySelectorAll('.service-card button').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      serviceAction(+btn.dataset.action);
    };
  });
}

function viewServiceDetails(id) {
  const s = services.find(x => x.id === id);
  alert(`${s.title}\n\n${s.description}\n\nДэлгэрэнгүй мэдээлэл удахгүй.`);
}

function serviceAction(id) {
  const messages = {
    1: "Малын эмнэлгийн үйлчилгээ захиаллаа 🐾",
    2: "Сайн дурынхны хөтөлбөрт нэгдлээ 🤝",
    3: "Түр асаргааны мэдээлэл удахгүй 🏠"
  };
  alert(messages[id] || "Удахгүй нэмэгдэнэ");
}


function serviceIconVet() {
  return `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M9 12h6"/></svg>`;
}

function serviceIconVolunteer() {
  return `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M12 4"/></svg>`;
}

function serviceIconFoster() {
  return `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M3 12"/></svg>`;
}
