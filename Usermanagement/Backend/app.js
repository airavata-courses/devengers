const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const {receiveMsg }=require('./controllers/queue');
// load env variables
const dotenv = require('dotenv');
dotenv.config()

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });
  receiveMsg();
// bring in routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const queueRoutes = require('./routes/queue');
const apiGatewayRoutes = require('./routes/apiGateway')
// apiDocs
app.get('/', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(expressValidator());
app.use(cors());
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', queueRoutes);
app.use('/', apiGatewayRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(8080);