const express = require('express')
const mongodb = require('mongodb')

const app = express()

const uri = process.env.DATABASE_URI
 
app.get('/', function(request, response) {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db("music")
    const tracksCollection = db.collection("tracks")
    tracksCollection.find().toArray(function(error, tracks){
      response.send(error || tracks)
    client.close()
    })
  })
})

app.get('/books', function(request, response) {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db("music")
    const tracksCollection = db.collection("tracks")
    tracksCollection.find().toArray(function(error, tracks){
      response.send(error || tracks)
    client.close()
    })
  })
})
app.listen(process.env.PORT)
