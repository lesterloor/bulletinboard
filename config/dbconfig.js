var Sequelize = require("sequelize");

var sequelize = new Sequelize({
  username: "postgres",
  password: "blu",
  dialect: "postgres",
  database: "bulletinboard"
});

var Insert = sequelize.define("message", {
  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

Insert.sync();

module.exports = Insert;
