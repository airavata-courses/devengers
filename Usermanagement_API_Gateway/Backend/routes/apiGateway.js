const express = require('express');
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
const { sendMsg }=require('../controllers/queue');


   router.put('/weatherData', function(req, res) {
        res.redirect(307,'/weatherData/queue');
   });
   
   router.get('/sessionData/:userid',function(req, res){
          var userid = req.params.userid;
          console.log(userid);
        res.redirect(307,'http://129.114.104.27:32179/rest/db/'+userid);
   });

   module.exports = router;

