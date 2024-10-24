const mongoose = require('mongoose')

const blacklistedTokensSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('blacklistedTokens', blacklistedTokensSchema)