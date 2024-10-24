const jwt = require('jsonwebtoken')
const DB = require('../models')
require('dotenv').config();

exports.jwtCheck = async function (req, res, next){
    const token = req.headers.authorization.split(' ')[1]
    const blackListedToken = await DB.blackListedTokens.findOne({token: token})

    jwt.verify(token, process.env.SECRET_PASSWORD, (error, decoded) => {
        
        if( error || (blackListedToken != null) ){
            console.log(error)  

            return res.status(401).send({
                message: "Invalid token"
            })
        }
        req.user = decoded;
        req.token = token
        
        next();
    });
}





// JWT Authentication
// exports.jwtCheck = async function (req, res, next) {
//     const token = req.headers.authorization.split(' ')[1]
//     const blackListedToken = await DB.blackListedTokens.findOne({token: token})
    
//     jwt.verify(token, process.env.SECRET_PASSWORD, (err, decoded) => {
        
//         if( err || (blackListedToken != null) ){
//             console.log(err)            
//             if (Object.values(altOnlineUser).includes(decoded.username)){    
//                 const socketID = Object.keys(altOnlineUser).find(key => altOnlineUser[key] === decoded.username);
//                 delete altOnlineUser[socketID]
//             }

//             return res.status(401).send({
//                 message: "Invalid token"
//             })
//         }
//         req.user = decoded;
//         req.token = token
        
//         next();
//     });
// }