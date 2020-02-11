const express = require('express');
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
const { sendMsg }=require('../controllers/queue');


   router.put('/weatherData', function(req, res) {
    res.redirect(307,'/weatherData/queue');
   });
   
   module.exports = router;