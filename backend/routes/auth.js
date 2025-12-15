const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

router.post("/register", async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password) return res.status(400).json({ error: "email, password шаардлагатай" });
    if (password.length < 6) return res.status(400).json({ error: "Нууц үг 6+ тэмдэгт байх ёстой" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Энэ email бүртгэлтэй байна" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    res.status(201).json({ ok: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password) return res.status(400).json({ error: "email, password шаардлагатай" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Буруу email эсвэл нууц үг" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: "Буруу email эсвэл нууц үг" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      ok: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
