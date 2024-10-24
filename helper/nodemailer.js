const nodemailer = require("nodemailer")
require('dotenv').config();

exports.sendEmail = async (userEmail, link) => {
    try {
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
            html: `<a href=${link}>CLICK here to verify your email</a>`
        }

        // Use await to send the email
        const info = await transporter.sendMail(emailContent);
        console.log("Verification Email has been SENT!", info.response);

    } catch (error) {
        console.log("There is an ERROR sending the email!", error.message);
        throw error;
    }
}
