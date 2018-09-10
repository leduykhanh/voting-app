const express = require('express');
const routes = express.Router({ strict: true });
const { Vote } = require('./model');
const sockets = {};

routes.get('/vote',
 (req, res) => {
   Vote.findAll().then((items) => {
     const  data = items.map((one) => one.get());

     res.status(200).json(data)
   })

 }
);

routes.post('/vote',
 (req, res) => {
   const { id, count } = req.body;
   Vote.findById(id)
   .then(vote => vote.increment({count: 1}))
   .then(
     (vote) => {
       res.io.emit("vote-update", vote);
       res.status(200).json({a:1});
     }
   );

 }
);
module.exports = { routes, sockets };
