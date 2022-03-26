const User = require("../models/user.model");
const Post = require("../models/roomiePosts.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/😁");

async function login({userID, password}, callback){
    const user = await User.findOne({userID});

    if(user != null ){
        if(bcrypt.compareSync(password, user.password)){
            const token = auth.generateAccessToken(userID);
            return callback(null, {...user.toJSON(), token});
        }else{
            return callback({
                message: "Invalid UserID / Password"
            });
        }
    }else{
        return callback({
            message:"User not Found"
        });
    }
}

async function register(params, callback){
    if(params.userID === undefined){
        return callback({message:"userID required"});
    }
    const user = new User(params);
    user.save().then((response) =>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
}



async function findRoomie({userID, title, address, price }, callback){
    const user = await User.findOne({userID});

    if(user != null){
        const post = new Post({userID, title, address, price });
        post.save().then((response) =>{
            return callback(null, response);
        }).catch((error) =>{
            return callback(error);
        });
    }
}



module.exports ={
    login,
    register,
    findRoomie
};