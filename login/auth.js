const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
loginTab.onclick=()=>{
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("show");
  registerForm.classList.remove("show");
};
registerTab.onclick=()=>{
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("show");
  loginForm.classList.remove("show");
};
if (localStorage.getItem("token")){
  window.location.href="../index.html";
}
function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("rememberMe").checked;

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password})
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.token){
      if(remember){
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        sessionStorage.setItem("token", data.token);
      }
      window.location.href="../index.html";
    } 
    else{
      alert(data.error);
    }
  });
}
function register(){
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const confirmPassword=document.getElementById("confirmPassword").value;
  if(!name || !email || !password || !confirmPassword){
    alert("Бүх талбарыг бөглөнө үү!");
    return;
  }
if(password!==confirmPassword){
    alert("Нууц үг таарахгүй байна!");
    return;
  }
  fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name, email, password})
  })
  .then(res=>res.json())
  .then(data=>{
    alert("Бүртгэл амжилттай! Нэвтрэх хуудас руу шилжинэ.");
    window.location.href = "login.html";
  })
  .catch(()=>alert("Алдаа гарлаа"));
}
fetch("http://localhost:5000/forgot-password",{
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({email})
});
function showRules(){
  document.getElementById("password-rules").style.display="block";
}
function checkPassword(){
  const password = document.getElementById("password").value;
  const lengthRule = document.getElementById("rule-length");
  const upperRule = document.getElementById("rule-uppercase");
  if(password.length >= 8){
    lengthRule.classList.add("valid");
  } else{
    lengthRule.classList.remove("valid");
  }
  if (/[A-Z]/.test(password)){
    upperRule.classList.add("valid");
  } else{
    upperRule.classList.remove("valid");
  }
}