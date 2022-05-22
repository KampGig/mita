const Post  = require('../models/roomiePosts.model');
const Request = require("../models/request.model");



async function getAllRequests(params, callback){
  
        Request.find().then((response) =>{
            return callback(null, response);
        }).catch((error) =>{
            return callback(error);
        });
   
}
module.exports ={
    getAllRequests

   
};