const db = require("../models");
const Users = db.users; // Mengubah 'User' menjadi 'Users'
// const Op = db.Sequelize.Op;

// Menambahkan pengguna baru
exports.create = (req, res) => {
  console.log("Request : ", req.body);
  validateRequest(req);

  const Users = { // Mengubah 'user' menjadi 'users'
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password,
    role: req.body.role
  };

  Users.create(users) // Mengubah 'User' menjadi 'Users'
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Kesalahan saat menambahkan pengguna!"
      });
    });
};

// Menemukan semua pengguna
exports.findAll = (req, res) => {
  Users.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Kesalahan saat mengambil semua pengguna!"
      });
    });
};

// Menemukan pengguna berdasarkan ID pengguna
exports.findOne = (req, res) => {
  console.log("Request : ", req.body);
  validateRequest(req);

  const id = req.body.id;
  Users.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Pengguna tidak ditemukan!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Kesalahan saat mengambil pengguna berdasarkan ID pengguna: " + id
      });
    });
};

// Memperbarui pengguna berdasarkan ID pengguna
exports.update = (req, res) => {
  console.log("Request : ", req.body);
  validateRequest(req);

  const id = req.body.id;
  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pengguna berhasil diperbarui."
        });
      } else {
        res.send({
          message: "Proses pembaruan gagal."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Kesalahan saat memperbarui pengguna dengan ID pengguna: " + id
      });
    });
};

// Menghapus pengguna berdasarkan ID pengguna
exports.delete = (req, res) => {
  console.log("Request : ", req.body);
  validateRequest(req);

  const id = req.body.id;
  Users.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pengguna berhasil dihapus."
        });
      } else {
        res.send({
          message: "Proses penghapusan gagal."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Tidak dapat menghapus pengguna dengan ID pengguna: " + id
      });
    });
};

function validateRequest(req) {
  if (!req.body) {
    res.status(400).send({
      message: "Permintaan kosong!"
    });
    return;
  }
}
