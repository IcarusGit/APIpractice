const DB = require('../models')
const bcrypt = require('bcrypt');
const { sendEmail } = require('../helper/nodemailer')
const crypto = require('crypto'); // does not need to npm i bcrypto, it is built in already 

exports.index = async (req, res) => {
    const isUsernameExisting = await DB.registeredUsers.findOne({username: req.body.username})
    try {
        if (isUsernameExisting != null){
            res.send({
                message: "Username is already existing. TRY AGAIN.",
                status: "false"
            })
    
            return false
        }
    
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        // save a user to the database
        const newUser = new DB.registeredUsers({
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role,
            email: req.body.email,
            verified: false            
        })    

        await newUser.save()
        console.log("=========================================")
        console.log("A user has registered")
        // ====================================================================================================

        // save token 
        let createToken = new DB.registerToken({
            userID: newUser._id,
            token: crypto.randomBytes(16).toString('hex')    
        })

        await createToken.save()
        console.log("=========================================")
        console.log("A token is saved in the database")

        // ====================================================================================================
        // Generate the verification link
        const verificationLink = `http://localhost:3002/api/verify/${createToken.token}`
        console.log("=========================================")
        console.log(verificationLink)
        console.log("=========================================")
        // if you await sendEmail() then you would wait longer before you res.send so just leave like this
        sendEmail(req.body.email, verificationLink)

        return res.send({
            message: "Registration done. Check your email for verification.",
            status: "true",
            username: newUser.username
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Error registering user',
            status: false
        });
    }

}