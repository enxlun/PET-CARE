const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "petcare_secret_key";

// ---------------- BÜRTGÜÜLEH -----------------
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(400).json({ error: "Имэйл давхцсан эсвэл буруу!" });
        return res.json({ message: "Бүртгэл амжилттай!" });
    });
});

// ---------------- НЭВТРЭХ -----------------
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {

        if (results.length === 0)
            return res.status(400).json({ error: "Имэйл буруу!" });

        const user = results[0];

        // Нууц үг шалгах
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ error: "Нууц үг буруу!" });

        // JWT токен үүсгэх
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        return res.json({
            message: "Амжилттай нэвтэрлээ!",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    });
});

// ---------------- ЛОГИН ШАЛГАХ (Token Verify) -----------------
app.get("/profile", (req, res) => {
    const token = req.headers.authorization;

    if (!token)
        return res.status(401).json({ error: "Токен байхгүй!" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return res.json({ user: decoded });
    } catch {
        return res.status(401).json({ error: "Токен хүчингүй!" });
    }
});

// ---------------- СЕРВЕР АЖИЛЛУУЛАХ -----------------
app.listen(5000, () => {
    console.log("Server run on http://localhost:5000");
});