const express = require('express')
const router = express.Router()

const initRoutes = (app) => {
    // router.use('/chat',            require('./chat'))
    // router.use('/register',        require('./register'))
    // router.use('/login',           require('./login'))
    // router.use('/logout',          require('./logout'))
    // router.use('/tokenCheck',      require('./tokenCheck'))
    router.use('/register', require('./register'))
    router.use('/verify', require('./verify'))

    return app.use('/api', router)
}

module.exports = initRoutes