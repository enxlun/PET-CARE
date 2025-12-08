// Donation state
let selectedAmount = 0;
let paymentType = 'once';

// Select preset amount
function selectAmount(amount) {
  selectedAmount = amount;
  
  // Update UI - remove all selected states
  const amountButtons = document.querySelectorAll('.amount-btn');
  amountButtons.forEach(btn => btn.classList.remove('selected'));
  
  // Add selected state to clicked button
  event.target.closest('.amount-btn').classList.add('selected');
  
  // Clear custom input
  document.getElementById('customAmount').value = '';
  
  // Update submit button
  updateSubmitButton();
}

// Select custom amount
function selectCustomAmount(value) {
  selectedAmount = parseInt(value) || 0;
  
  // Remove all selected states from preset amounts
  const amountButtons = document.querySelectorAll('.amount-btn');
  amountButtons.forEach(btn => btn.classList.remove('selected'));
  
  // Update submit button
  updateSubmitButton();
}

// Select payment type
function selectPaymentType(type) {
  paymentType = type;
  
  // Update UI
  const paymentButtons = document.querySelectorAll('.payment-btn');
  paymentButtons.forEach(btn => btn.classList.remove('selected'));
  
  event.target.closest('.payment-btn').classList.add('selected');
  
  // Update submit button
  updateSubmitButton();
}

// Update submit button text
function updateSubmitButton() {
  const submitText = document.getElementById('submitText');
  
  if (selectedAmount > 0) {
    const formattedAmount = selectedAmount.toLocaleString('mn-MN');
    if (paymentType === 'monthly') {
      submitText.textContent = `Сар бүр ₮${formattedAmount} хандивлах`;
    } else {
      submitText.textContent = `₮${formattedAmount} хандив өгөх`;
    }
  } else {
    submitText.textContent = 'Хандив өгөх';
  }
}

// Submit donation
function submitDonation() {
  if (selectedAmount < 1000) {
    alert('Хандивын доод хэмжээ ₮1,000 байна. Та дүнгээ нэмэгдүүлнэ үү.');
    return;
  }
  
  const formattedAmount = selectedAmount.toLocaleString('mn-MN');
  const typeText = paymentType === 'monthly' ? 'сар бүрийн' : 'нэг удаагийн';
  
  // Simulate donation processing
  const submitButton = document.querySelector('.btn-submit');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = 'Боловсруулж байна...';
  submitButton.disabled = true;
  
  setTimeout(() => {
    alert(`Баярлалaa! Таны ₮${formattedAmount} ${typeText} хандив амжилттай боловсруулагдлаа.\n\nТа удахгүй баталгаажуулах и-мэйл хүлээн авах болно.`);
    
    // Reset form
    selectedAmount = 0;
    document.getElementById('customAmount').value = '';
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
    updateSubmitButton();
  }, 2000);
}

// Navigation function
function navigateTo(page) {
  console.log('Navigating to:', page);
  
  if (page === 'adopt') {
    window.location.href = 'urchleh.html';
  } else if (page === 'services') {
    alert('Үйлчилгээний хуудас удахгүй нэмэгдэх болно!');
  } else if (page === 'donate') {
    window.location.href = 'donate.html';
  } else if (page === 'home') {
    window.location.href = 'index.html';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Add Enter key support for custom amount
  const customAmountInput = document.getElementById('customAmount');
  customAmountInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      submitDonation();
    }
  });
  
  // Animate progress bar on load
  setTimeout(() => {
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
      progressBar.style.width = '70%';
    }
  }, 500);
});
