const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Бүртгүүлэх
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Хэрэглэгч аль хэдийн бүртгэлтэй эсэхийг шалгах
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'И-мэйл аль хэдийн бүртгэлтэй байна' });
    }

    // Шинэ хэрэглэгч үүсгэх
    const user = new User({ name, email, password });
    await user.save();

    // Token үүсгэх
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Амжилттай бүртгэгдлээ',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Нэвтрэх
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Хэрэглэгч байгаа эсэхийг шалгах
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'И-мэйл буруу байна' });
    }

    // Нууц үг зөв эсэхийг шалгах
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Нууц үг буруу байна' });
    }

    // Token үүсгэх
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Амжилттай нэвтэрлээ',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;