const express       = require('express');
const mongoose      = require('mongoose');
const dbconfig      = require('./config/db.config');
const unless        = require('express-unless');
const cors          = require('cors');
const path = require('path')
const app = express();

// GETTING AUTH & ERRORS MIDDLEWARES
const auth          = require('./middlewares/😁');
const errors        = require('./middlewares/😡');
const bodyParser = require('body-parser');

// MONGODB CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  }).then(() => {
    console.log("Your db has been connected successfuly...Lets roll😊");
  },
    (error) => {
        console.log('An Error occured: '+ error );
    } 
  );

app.get("/", function (req, res) {
  res.send("WORKING!!!");
});

app.listen(process.env.PORT || 5000);
