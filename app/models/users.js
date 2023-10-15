module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER, // Corrected data type
      primaryKey: true, // Assuming it's a primary key
      autoIncrement: true // Assuming it's an auto-increment field
    },
    email: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    }
  });

  return User;
};
