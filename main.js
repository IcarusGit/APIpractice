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

// DB.mongoose.connect(DB.url).then(async (res) => {
//     console.log(` Runtime: Connected to ${ res.connections[0]['_connectionString'].includes('localhost') ? "localhost" : "ATLAS" } MongoDB`)
// }).catch((err) => {
//     console.log(err)
// })

const startDatabaseConnection = async () => {
    try {
        const connection = await DB.mongoose.connect(DB.url); // Connect to the database

        // Log the connection details
        console.log(`Runtime: Connected to ${connection.connections[0]['_connectionString'].includes('localhost') ? "localhost" : "ATLAS"} MongoDB`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if the DB connection fails
    }
};

const startServer = () => {
    app.listen(3002, (error) => {
        if (error) {
            console.error('Error starting the server:', error);
        } else {
            console.log(`Application running at port 3002`);
        }
    });
};

// Start the database connection and then start the server
const initializeAPI = async () => {
    await startDatabaseConnection(); // Wait for the DB connection to complete
    startServer(); // Start the server
};

initializeAPI();
// ====================================================================================================
// Tell express to run at port 3002
