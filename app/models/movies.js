module.exports = (sequelize, Sequelize) => {
  const Movies = sequelize.define("movies", {
    id: {
      type: Sequelize.INTEGER, // Corrected data type
      primaryKey: true, // Assuming it's a primary key
      autoIncrement: true // Assuming it's an auto-increment field
    },
    title: {
      type: Sequelize.STRING
    },
    genres: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    isDeleted: {
      type: Sequelize.BOOLEAN
    }
  });
  return Movies;
};
