const express = require('express')
const mongodb = require('mongodb')

const app = express()

const uri = process.env.DATABASE_URI

app.get('/', function(request, response) {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    response.send('Hello, world!')
    client.close()
  })
})

app.listen(process.env.PORT)
