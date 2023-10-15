const { validationResult } = require("express-validator");
const db = require("../models");
const Users = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Fungsi untuk mendaftarkan pengguna
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

// Register 
  const { username, email, password } = req.body;

  // password 
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Simpan pengguna ke basis data
    Users.create({
      username,
      email,
      password: hashedPassword,
    })
      .then(user => {
        res.status(201).json({ message: "User registered successfully" });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
};

// Fungsi untuk login pengguna
exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  /**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Mendapatkan semua film
 *     responses:
 *       200:
 *         description: OK
 */

  // Validasi telah berhasil, lanjutkan dengan login pengguna
  const { username, password } = req.body;

  Users.findOne({ where: { username } }).then(user => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result) {
        // Generate token JWT untuk otorisasi
        const token = jwt.sign(
          {
            userId: user.id,
            username: user.username,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" } // Ganti sesuai kebutuhan
        );
        return res.status(200).json({ token });
      }

      return res.status(401).json({ error: "Authentication failed" });
    });
  });
};
