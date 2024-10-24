const mongoose = require('mongoose')

const registerTokenSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)


// const crypto = require('crypto');

// // Generate 16 random bytes and convert them to a hexadecimal string
// const randomToken = crypto.randomBytes(16).toString('hex');

module.exports = mongoose.model('registerToken', registerTokenSchema)