const DB = require('../models')
const bcrypt = require('bcrypt');
const sendEmail = require('../helper/nodemailer')

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
        let userInfo = {
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role,
            email: req.body.email            
        }
    
        // save a user to the database
        const newUser = new DB.registeredUsers(userInfo)    
        await newUser.save()
        console.log("A user has registered")

        // Generate the verification link
        const verificationLink = 'http://localhost:3002/api/verify/:token'
        //`http://your-domain.com/verify-email?token=${newUser._id}`;
        sendEmail(req.body.email, verificationLink)

        res.send({
            message: "Registration done. Check your email for verification.",
            status: "true",
            userInfo: userInfo
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Error registering user',
            status: false
        });
    }

}