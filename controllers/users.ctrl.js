const bcryptjs = require("bcryptjs");
const bcrypt        = require("bcryptjs");
const userService   =require("../services/users.services");



// vonage intialization
const Vonage = require('@vonage/server-sdk');
const User = require("../models/user.model");
const read = require("body-parser/lib/read");
const vonage = new Vonage({
    // change this things
  apiKey: "3f75ce65",  
  apiSecret: "PQ93RtwrYCBgfUdc"
});

// otp logic 
// Generate and send code
exports.sendCode = (req, res) =>{

  // Twilio Sms verification
  client.messages.create({
    body:'Testing twilio sms service',
    to: '+2349011151246',
    from: '+18456842839'
  }).then(message => console.log(message)).catch(error => console.log(error));

    // vonage.verify.request({
    //   number: req.body.phone,
    //   brand: "KampGig"
    // }, (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     res.send('An Error Occured')
    //   } else {

    //     const verifyRequestId = result.request_id;
    //     console.log('request_id', verifyRequestId);
    //     console.log(result);
    //     res.send({requestId: verifyRequestId})

    //   }
    // });
}

// Verify otp code
exports.checkCode = (req, res) =>{
   
     vonage.verify.check({
      request_id: req.body.id,
      code: req.body.code,
      }, (err, result) => {
            if (err) {
              console.error(err);
              res.send('invalid');
             // Get lucky's error page
             
            } else {
              console.log(result);
              res.status(200).send({
                message:"success",
                data: result,
            });
             
              }
         }
    );
      
}




exports.register = (req, res, next) =>{
    const {password} = req.body;
    const {phone} = req.body;
    const {fName} = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);
    userService.register(req.body,(error,result) =>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: result,
        });
    });
};

exports.login = (req, res, next) =>{
    const {userID, password} = req.body;
    userService.login({userID, password}, (error, result) =>{
        if(error){return next(error);}
        return res.status(200).send({
            message:"success",
            data: result,
        });
    });
};

exports.userProfile = (req, res,next) =>{
    return res.status(200).json({
        message: "Authorized user",
        
    });
};

// Post request to find roomie
exports.findRoomie = (req, res, next) => {
  const {userID, title, address, price } = req.body;
  userService.findRoomie(req.body, (error, result) =>{
    if(error){
      return next(error);
    }
    return res.status(200).send({
      message: "success",
      data: result,
  });
  });
};
