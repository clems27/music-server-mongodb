const express = require('express')
const mongodb = require('mongodb')

const app = express()

const uri = process.env.DATABASE_URI

app.get('/', function(request, response) {
  mongodb.MongoClient.connect(uri, function(error, client) {
    response.send('Hello, world!')
  })
})

app.listen(process.env.PORT)
