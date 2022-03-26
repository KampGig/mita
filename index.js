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

   // INIT bodyParser
   app.use(bodyParser.urlencoded({extended: true}));
   // CHECKING TOKEN IF NEEDED
   auth.authenticateToken.unless = unless;
   express.static.unless = unless;
 
   
  // ROUTES
  app.use("/users", require("./routes/users.routes"));
 
  app.use(errors.errorHandler);
app.use("/uploads", express.static("uploads"));
  

app.get("/", function (req, res) {
  res.send(" All Good boy");
});
 // METHOD TO USE REQUEST AS AN OBJECT
 app.use(express.json());


 // TOKEN BYPASS PAGES
 
 app.use(
  auth.authenticateToken.unless({
      path:[
          '/uploads/',
          {url:"/users/login", method: ["POST"]},
          {url:"/", method: ["GET"]},
          {url:"/users/register", method: ["POST"]},
          {url:"/users/otpRequest", method: ["POST"]},
          {url:"/users/checkCode", method: ["POST"]},
          {url:"/users/createPost", method: ["POST"]},
          {url:"/users/roomiePosts", method: ["GET"]},
          {url:"/users/updatePost/6227b709a519c6037256f68d", method: ["PUT"]},
        //   {url:"/users/postByUser/james@123", method: ["GET"]},
          // {url:"/uploads/1647476387750-.png", method: ["GET"]},
      ]
  })
);


app.listen(process.env.PORT || 5000);
