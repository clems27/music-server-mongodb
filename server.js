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
      response.json(error || tracks)
    client.close()
    })
  })
})

app.get('/tracks/search', function(request, response) {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db("music")
    const tracksCollection = db.collection("tracks")
    const searchObject = {}
    if(request.query.artist){
       searchObject.artist=request.query.artist
    }
    if(request.query.album){
       searchObject.album=request.query.album
    }
    
    if(request.query.title){
       searchObject.title=request.query.title
    }
    if(request.query.year){
       searchObject.year= parseInt(request.query.year)
    }
    tracksCollection.find(searchObject).toArray(function(error, tracks){
      response.json(error || tracks)
    client.close()
    })
  })
})

app.get('/tracks/:id', function(request, response) {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db('music')
    const tracksCollection = db.collection('tracks')

    const string = '5cf2eb7d1c9d4400006fca92'
    const id = new mongodb.ObjectID(string)
    const searchObject = { _id: id }

    tracksCollection.findOne(searchObject, function(error, track) {
      if (error) return {msg:`error`}
      response.json(tracks)
      response.send(error || track)
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
