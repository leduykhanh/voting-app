const Sequelize = require('sequelize');

const sequelize = new Sequelize('sqlite:vote.db');

const Vote = sequelize.define('vote', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  count: Sequelize.INTEGER
});

module.exports = { Vote, sequelize };
