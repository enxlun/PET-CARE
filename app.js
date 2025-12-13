let currentPage = 'home';

function navigateTo(page) {
  window.location.hash = page;
}

function handleHashChange() {
  let page = window.location.hash.replace('#', '') || 'home';

  const allowedPages = ['home', 'urchleh', 'archlah', 'handiv'];
  if (!allowedPages.includes(page)) {
    page = 'home';
  }

  currentPage = page;

  closeMobileMenu();
  updateActiveLinks(page);
  toggleDonateButton(page);

  renderPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function renderPage(page) {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  try {
    const res = await fetch(`pages/${page}.html`);
    if (!res.ok) throw new Error('Page not found');

    mainContent.innerHTML = await res.text();

    if (page === 'urchleh' && typeof initUrchlehPage === 'function') {
      initUrchlehPage();
    }
    if (page === 'handiv' && typeof initHandivPage === 'function') {
      initHandivPage();
    }

  } catch (err) {
    mainContent.innerHTML = `<h2>Page not found</h2>`;
    console.error(err);
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOpen = document.getElementById('menu-open');
  const menuClose = document.getElementById('menu-close');

  mobileMenu?.classList.toggle('hidden');
  menuOpen?.classList.toggle('hidden');
  menuClose?.classList.toggle('hidden');
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOpen = document.getElementById('menu-open');
  const menuClose = document.getElementById('menu-close');

  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    menuOpen?.classList.remove('hidden');
    menuClose?.classList.add('hidden');
  }
}

function updateActiveLinks(page) {
  document.querySelectorAll('.nav-link, .mobile-nav-link')
    .forEach(link => link.classList.remove('active'));

  document.getElementById(`nav-${page}`)?.classList.add('active');
}

function toggleDonateButton(page) {
  const floatingDonate = document.getElementById('floating-donate');
  if (!floatingDonate) return;

  page === 'handiv'
    ? floatingDonate.classList.add('hidden')
    : floatingDonate.classList.remove('hidden');
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('DOMContentLoaded', handleHashChange);
