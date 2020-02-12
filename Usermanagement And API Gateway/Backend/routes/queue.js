const express = require('express');
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
const { sendMsg , receiveMsg}=require('../controllers/queue');

router.put("/weatherData/queue", requireSignin, sendMsg ,receiveMsg);

module.exports = router;

