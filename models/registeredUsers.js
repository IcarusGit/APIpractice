const mongoose = require('mongoose')


const registeredUsersSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        verified:{
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('registeredUsers', registeredUsersSchema)