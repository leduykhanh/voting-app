const { Vote, sequelize } = require('./model');
sequelize.sync().then(
  () =>{
        for (let i = 1; i < 18; i++) {
          Vote.create({ id: i, count: 0}).then(v => console.log(v));
        }
      }
);
