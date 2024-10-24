const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())

// Tell express to read JSON
app.use(express.json())

//=========================================

const mongoose = require('mongoose')
const DB = require('./models')

//=========================================

const initRoutes = require('./routes')
initRoutes(app)

//=========================================



DB.mongoose.connect(DB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async (res) => {
    console.log(` Runtime: Connected to ${ res.connections[0]['_connectionString'].includes('localhost') ? "localhost" : "ATLAS" } MongoDB`)

}).catch((err) => {
    console.log(err)
})



// ====================================================================================================
// Tell express to run at port 3002
app.listen(3002, () => {
    console.log(`Application runnning at port 3002`)
})