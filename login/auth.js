const API_BASE = "http://localhost:5000/api";

async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data = {};
  try { data = JSON.parse(text); } catch {}

  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}: ${text.slice(0, 120)}`);
  }
  return data;
}

// login.html -> onclick="login()"
window.login = async function login() {
  try {
    const email = (document.getElementById("email")?.value || "").trim();
    const password = document.getElementById("password")?.value || "";

    if (!email || !password) return alert("❌ Имэйл болон нууц үгээ оруулна уу");

    const data = await postJSON(`${API_BASE}/login`, { email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("✅ Амжилттай нэвтэрлээ!");
    window.location.href = "../index.html#home";
  } catch (e) {
    alert("❌ " + e.message);
  }
};

// register.html -> onclick="register()"
window.register = async function register() {
  try {
    const name = (document.getElementById("name")?.value || "").trim();
    const email = (document.getElementById("email")?.value || "").trim();
    const password = document.getElementById("password")?.value || "";
    const confirmPassword = document.getElementById("confirmPassword")?.value || "";

    if (!email || !password) return alert("❌ Имэйл болон нууц үгээ оруулна уу");
    if (password.length < 6) return alert("❌ Нууц үг 6+ тэмдэгт байх ёстой");
    if (password !== confirmPassword) return alert("❌ Нууц үг таарахгүй байна");

    await postJSON(`${API_BASE}/register`, { name, email, password });

    alert("✅ Бүртгэл амжилттай! Одоо нэвтэрнэ үү.");
    window.location.href = "login.html";
  } catch (e) {
    alert("❌ " + e.message);
  }
};
