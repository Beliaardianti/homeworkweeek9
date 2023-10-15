const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8787"
};

const db = require("./app/models");
db.sequelize.sync();

const morgan = require('morgan')
// require('dotenv').config()
app.use(morgan('combined'))

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ 
  extended: true 
}));

const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Gabungkan rute-rute Swagger dari file terpisah
const moviesSwagger = require("./moviesSwagger");
const usersSwagger = require("./usersSwagger");

// Gabungkan definisi Swagger untuk kedua router
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for Movies and Users",
    },
  },
  apis: ["./moviesSwagger.js", "./usersSwagger.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Gunakan middleware Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Gunakan router dari file terpisah
app.use(moviesSwagger);
app.use(usersSwagger);

// Mulai server Anda






app.get("/", (req, res) => {
  res.json({ message: "This is a simple CRUD project using node js and postgres sql" });
});
require("./app/routes/movies-routes")(app);
require("./app/routes/users-routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Running on port ", PORT);
});
