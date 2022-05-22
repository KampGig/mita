const bodyParser       =require('body-parser');
const multer           =require('multer');
const path             = require('path');
const mongoose         = require('mongoose');
const admin   = require("../services/admin.service");


exports.getAll = (req,res, next) =>{
   
    var model = {
         address: req.query.address
   };


   admin.getAllRequests(model, (error, results)=>{
    if(error){
       return next(error);
     }else{
    return res.status(200).send({
    message: 'success',
    data: results
   })
        }
    })

        
    
}