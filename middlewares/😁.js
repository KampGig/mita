const { sendStatus } = require('express/lib/response');
const jwt       = require('jsonwebtoken');


function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null ) return res.sendStatus(401);

    jwt.verify(token, "!!kampg!g4", (err, user) => {
        if(err){
            console.log(err);
            return res.sendStatus(403);
        } 
        req.user = user;
        next();
    });
}

function generateAccessToken(userID){
    return jwt.sign({data: userID}, "!!kampg!g4", {
        expiresIn: "2 days"
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken
};