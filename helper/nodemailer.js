const nodemailer = require("nodemailer")
require('dotenv').config();

exports.sendEmail = (userEmail, link) => {
    
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "basteforcoding123@gmail.com",
            pass: process.env.EMAIL_PW
        }
    })
    
    let emailContent = {
        from: "basteforcoding123@gmail.com",
        to: userEmail,
        subject: "VERIFICATION LINK",
        // text: "enter any text here"
        html: `<a href="${link}">CLICK here to verify your email</a>`
    }
    
    
    transporter.sendMail(emailContent, (error, info) => {
        if (error) {
            console.log("There is an ERROR sending in email!", error.message)
           
        } else {
            console.log("Verification Email has been SENT!", info.response)
        }
    });
}

sendEmail()