const express       = require('express');
const mongoose      = require('mongoose');

const unless        = require('express-unless');
const cors          = require('cors');
const path = require('path')


// GETTING AUTH & ERRORS MIDDLEWARES

const bodyParser = require('body-parser');



// INITIALIZING EXPRESS
const app           = express();
app.use(cors({origin:"*"}));



  app.use(bodyParser.urlencoded({extended: true}));
  // CHECKING TOKEN IF NEEDED
 
  app.get('/', (req, res)=>{
    res.send(`<h1>It works</h1>`)
  })
 

  // METHOD TO USE REQUEST AS AN OBJECT
  app.use(express.json());

  // MAIN LOCAL PORT CONECTION
  app.listen(process.env.port || 3000, () =>{
      console.log("Lets burst");
  });