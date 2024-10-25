const mongoose = require('mongoose')

const DB = {}
DB.mongoose = mongoose
DB.url = "mongodb+srv://basteforcoding123:a4Kl9C8qyv22LjCV@myfirstcluster.qoarsvd.mongodb.net/?retryWrites=true&w=majority"
DB.registeredUsers = require('./registeredUsers')
DB.registerToken = require('./registerToken')

module.exports = DB