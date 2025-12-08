const services = [
  {
    id: 1,
    title: "Малын эмнэлгийн үйлчилгээ",
    description: "Мэргэжлийн малын эмч нар аврагдсан амьтдад иж бүрэн эрүүл мэндийн үзлэг, эмчилгээ хийдэг.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>`,
    features: [
      "Ерөнхий эрүүл мэндийн үзлэг",
      "Вакцинжуулалт болон эмчилгээ",
      "Мэс засал ба халдваргүйжүүлэлт",
      "Яаралтай тусламж"
    ],
    buttonText: "Захиалах",
    buttonType: "secondary"
  },
  {
    id: 2,
    title: "Сайн дурынхны хөтөлбөр",
    description: "Манай баг болж амьтдын амьдралд эерэг өөрчлөлт авчрах олон янзын сайн дурынхны боломжууд.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>`,
    features: [
      "Амьтдыг тэжээх, өдөр тутмын арчилгаа",
      "Олон нийтийн мэдлэг өгөх үйл ажиллагаа",
      "Арга хэмжээний зохион байгуулалт",
      "Амьтдыг сэтгэл ханамжтай болгох"
    ],
    buttonText: "Нэгдэх",
    buttonType: "outline"
  },
  {
    id: 3,
    title: "Түр асаргааны хөтөлбөр",
    description: "Амьтад мөнх гэрээ олох хүртэл түр хугацаагаар гэртээ байрлуулж, хайр энхрийлэл өгөх.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>`,
    features: [
      "Бүх хэрэгцээт зүйлс хангагдана",
      "Малын эмчийн дэмжлэг",
      "Сургалт болон зөвлөгөө",
      "Нийгэмлэгийн дэмжлэг"
    ],
    buttonText: "Дэлгэрэнгүй",
    buttonType: "outline"
  },
  {
    id: 4,
    title: "Амьтны сургалтын ангиуд",
    description: "Өрхжүүлсэн болон аврагдсан амьтдад зөв дадал хэвшил сургах мэргэжлийн сургалтууд.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>`,
    features: [
      "Үндсэн дуулгавартай болгох",
      "Зан төлөвийн асуудал засах",
      "Нийгэмшүүлэх ангиуд",
      "Үргэлжлүүлсэн дэмжлэг"
    ],
    buttonText: "Бүртгүүлэх",
    buttonType: "outline"
  },
  {
    id: 5,
    title: "Тэжээлийн банк",
    description: "Хэрэгцээтэй өрх болон амьтны эзэмшигчдэд амьтны хоол, хангамжийн зүйлсийг өгөх.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>`,
    features: [
      "Үнэгүй амьтны хоол",
      "Асаргааны хэрэгслүүд",
      "Сарын тусламж",
      "Эмнэлгийн тусламжийн ваучерууд"
    ],
    buttonText: "Хүсэлт гаргах",
    buttonType: "outline"
  },
  {
    id: 6,
    title: "Эмнэлгийн урьдчилсан сэргийлэлт",
    description: "Өвчлөл, гачигдлаас урьдчилан сэргийлэх иж бүрэн эрүүл мэндийн хөтөлбөрүүд.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>`,
    features: [
      "Жилийн эрүүл мэндийн үзлэгүүд",
      "Шүдний арчилгаа",
      "Шимэгч хорхойн хяналт",
      "Эрүүл мэндийн дархлаажуулалт"
    ],
    buttonText: "Товлох",
    buttonType: "outline"
  }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  renderServices();
});

// Render services to grid
function renderServices() {
  const servicesGrid = document.getElementById('servicesGrid');
  
  servicesGrid.innerHTML = services.map(service => `
    <div class="service-card" onclick="viewServiceDetails(${service.id})">
      <div class="service-icon">
        ${service.icon}
      </div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <ul class="service-features">
        ${service.features.map(feature => `
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            ${feature}
          </li>
        `).join('')}
      </ul>
      <button class="btn btn-${service.buttonType}" onclick="serviceAction(${service.id}, event)">
        ${service.buttonText}
      </button>
    </div>
  `).join('');
}

// View service details
function viewServiceDetails(serviceId) {
  const service = services.find(s => s.id === serviceId);
  if (service) {
    console.log('Viewing service details:', service);
    alert(`${service.title}\n\n${service.description}\n\nДэлгэрэнгүй мэдээлэл удахгүй нэмэгдэх болно!`);
  }
}

// Service action (button click)
function serviceAction(serviceId, event) {
  // Prevent card click event from firing
  event.stopPropagation();
  
  const service = services.find(s => s.id === serviceId);
  if (service) {
    console.log('Service action:', service);
    
    // Different actions based on service type
    switch(serviceId) {
      case 1: // Veterinary
        alert(`Малын эмнэлгийн үйлчилгээ захиалах\n\nБид удахгүй таньтай холбогдох болно.`);
        break;
      case 2: // Volunteer
        alert(`Сайн дурынхны хөтөлбөрт нэгдэх\n\nБаярлалаа! Бид танд бүртгэлийн маягт илгээх болно.`);
        break;
      case 3: // Foster
        alert(`Түр асаргааны хөтөлбөр\n\nДэлгэрэнгүй мэдээлэл болон бүртгэлийн хуудас удахгүй нэмэгдэх болно.`);
        break;
      case 4: // Training
        alert(`Сургалтын ангиуд\n\nБид удахгүй өрөөтэй ангиудыг нээх болно!`);
        break;
      case 5: // Food bank
        alert(`Тэжээлийн банк\n\nТусламжийн хүсэлт гаргах маягт удахгүй боломжтой болно.`);
        break;
      case 6: // Wellness
        alert(`Эрүүл мэндийн хөтөлбөр\n\nБид удахгүй таньтай холбогдож үзлэг товлох болно.`);
        break;
      default:
        alert('Үйлчилгээний дэлгэрэнгүй мэдээлэл удахгүй нэмэгдэх болно!');
    }
  }
}

// Contact service
function contactService(type) {
  console.log('Contact service type:', type);
  
  if (type === 'rescue') {
    alert('Яаралтай дуудлага\n\n📞 Утас: +976 1234 5678\n⏰ 24/7 дуудлага хүлээн авах боломжтой\n\nАмьтныг аюулаас аврахад яаралтай тусламж хэрэгтэй бол заавал дуудна уу!');
  } else if (type === 'general') {
    alert('Холбоо барих\n\n📧 И-мэйл: medeelel@amitadavrakh.mn\n📞 Утас: +976 1234 5678\n📍 Хаяг: Амьтад аврах гудамж 123, Улаанбаатар\n\nБид таныг 24 цагийн дотор хариу өгөх болно!');
  }
}

// Navigate to volunteer
function navigateToVolunteer() {
  alert('Сайн дурынхны хуудас удахгүй нэмэгдэх болно!\n\nОдоогоор бидэнтэй холбогдож дэлгэрэнгүй мэдээлэл авна уу.');
}

// Navigation function
function navigateTo(page) {
  console.log('Navigating to:', page);
  
  if (page === 'adopt') {
    window.location.href = 'urchleh.html';
  } else if (page === 'services') {
    window.location.href = 'archlah.html';
  } else if (page === 'donate') {
    window.location.href = 'donate.html';
  } else if (page === 'home') {
    window.location.href = 'index.html';
  } else if (page === 'volunteer') {
    navigateToVolunteer();
  }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
