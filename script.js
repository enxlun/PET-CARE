function navigateTo(page) {
    console.log('Navigating to:', page);
    
    // You can customize navigation behavior here
    if (page === 'adopt') {
      // If you have the standalone adopt page
      window.location.href = 'urchleh-standalone.html';
    } else if (page === 'services') {
      alert('Үйлчилгээний хуудас удахгүй нэмэгдэх болно!');
    } else if (page === 'donate') {
      alert('Хандивын хуудас удахгүй нэмэгдэх болно!');
    } else if (page === 'home') {
      window.location.href = 'index.html';
    }
  }

  // Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});