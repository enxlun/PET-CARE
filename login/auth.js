const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
loginTab.onclick = () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");

  loginForm.classList.add("show");
  registerForm.classList.remove("show");
};
registerTab.onclick = () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("show");
  loginForm.classList.remove("show");
};