const express = require('express');
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
const { sendMsg }=require('../controllers/queue');


   router.put('/weatherData', function(req, res) {
        res.redirect(307,'/weatherData/queue');
   });
   
   router.get('/sessionData/:userid',function(req, res){
        res.redirect(307,'http://localhost:8300/rest/db/:userid');
   });

   module.exports = router;

