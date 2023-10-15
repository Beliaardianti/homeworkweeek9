const db = require("../models");
const Movies = db.movies;

// Fungsi untuk validasi request
function validateRequest(req) {
  if (!req.body) {
    res.status(400).send({
      message: "Request is empty!"
    });
    return;
  }
}

exports.findAll = (req, res) => {
  if (req.query.page) {
    const page = req.query.page;
    const limit = req.query.limit || 10; 
    const offset = (page - 1) * limit; 

    Movies.findAndCountAll({
      where: { isDeleted: false },
      limit: parseInt(limit),
      offset: offset,
    })
      .then(data => {
        const response = {
          page: page,
          limit: limit,
          totalItems: data.count,
          data: data.rows,
        };
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Error when getting all movies with pagination!",
        });
      });
  } else {
    // Jika query parameter page tidak ada, jalankan logika tanpa pagination
    Movies.findAll({ where: { isDeleted: false } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Error when getting all movies!",
        });
      });
  }
};

// Fungsi untuk menambahkan film
exports.create = (req, res) => {
  console.log("Request : ", req.body);
  validateRequest(req);

  const movies = {
    title: req.body.title,
    genres: req.body.genres,
    year: req.body.year ? req.body.year : false,
  };

  Movies.create(movies)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error when adding a movie!",
      });
    });
};

// Fungsi untuk mencari film berdasarkan ID film
exports.findOne = (req, res) => {
  console.log("Request : ", req.body);
  validateRequest(req);

  const id = req.body.id;
  Movies.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Movie not found!",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error when getting a movie by movie id: " + id,
      });
    });
};

// Fungsi untuk memperbarui film berdasarkan ID film
exports.update = (req, res) => {
  console.log("Request : ", req.body);
  validateRequest(req);

  const id = req.body.id;
  Movies.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Movie successfully updated.",
        });
      } else {
        res.send({
          message: "Update process was failedQ",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating movie with movie id: " + id,
      });
    });
};

// Fungsi untuk menghapus film berdasarkan ID film
exports.delete = (req, res) => {
  console.log("Request : ", req.body);
  validateRequest(req);

  const id = req.body.id;
  Movies.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Movie successfully deleted.",
        });
      } else {
        res.send({
          message: "Delete process was failed!",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Couldn't delete movie with movie id: " + id,
      });
    });
};
