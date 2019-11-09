const express = require('express')
const cors = require('cors')
const server = express()
const projectsRoutes = require('./projectRoutes')

server.use(express.json())
server.use(cors())

server.get('/',(req, res)=>{
    res.send('Welcome to the Api')
})

// here is where i will hold the CRUD for the projects
server.use('/projects', projectsRoutes)


module.exports = server