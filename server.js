const express = require('express')
const mongodb = require('mongodb')

const app = express()

const uri = process.env.DATABASE_URI
 
app.get('/', function(request, response) {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db("music")
    const tracksCollection = db.collection("tracks")
    const searchObject = 
    tracksCollection.find().toArray(function(error, tracks){
      response.json(error || tracks)
    client.close()
    })
  })
})

app.get('/books', function(request, response) {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db("literature")
    const tracksCollection = db.collection("books")
    tracksCollection.find().toArray(function(error, books){
      response.json(error || books)
    client.close()
    })
  })
})
app.listen(process.env.PORT)
