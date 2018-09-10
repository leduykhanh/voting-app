const { Vote, sequelize } = require('./model');
sequelize.sync().then(
  () =>{
        for (let i = 1; i < 18; i++) {
          Vote.update({ count: 0 }, {where: {id: i}});
        }
      }
);
