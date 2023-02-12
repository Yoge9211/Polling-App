const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const db = require('./dbConnection/mongoose')
const bodyParser = require('body-parser')
const app = express()

// define ports
const PORT = process.env.PORT
// apply body parser to parse requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// apply routes
app.use('/', require('./routes'))
// start the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
