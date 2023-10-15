const { jwtAuth } = require("../middleware");
const moviesServices = require("../controller/movies-services");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Authorization", "Origin, Content-Type, Accept");
    next();
  });

  /**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Mendapatkan semua film
 *     responses:
 *       200:
 *         description: OK
 */

  // add a product 
  app.post("/api/auth/addmovies", [jwtAuth.verifyToken], moviesServices.create);

  // find all product
  app.get("/api/auth/getmovies", [jwtAuth.verifyToken], moviesServices.findAll);

  // find product by product id
  app.post("/api/auth/getmoviesbyid", [jwtAuth.verifyToken], moviesServices.findOne);

  // update product by product id
  app.post("/api/auth/update", [jwtAuth.verifyToken], moviesServices.update);

  // delete productby product id
  app.post("/api/auth/delete", [jwtAuth.verifyToken], moviesServices.delete);

};