const DB = require('../models')
const bcrypt = require('bcrypt');
const sendEmail = require('../helper/nodemailer')

exports.index = async (req, res) => {
    try {
        return res.send("charan")
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Error registering user',
            status: false
        });
    }

}