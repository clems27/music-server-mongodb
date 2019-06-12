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

app.get('/tracks', function(request, response) {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db("music")
    const tracksCollection = db.collection("tracks")
    const searchObject = {
      artist: {
        $ne: 'Justice'
      }
    }

    tracksCollection.find(searchObject).toArray(function(error, tracks){
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
    console.log(searchObject)
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
    const stringId = request.params.id
//     if(isValidHex(stringId)){
//         return response.status(400).send('Invalid Id')

//     }
    const id = new mongodb.ObjectID(stringId) 
    const searchObject = { _id: id }
    console.log(searchObject)

  client.connect(function() {
    const db = client.db('music')
    const tracksCollection = db.collection('tracks')
    tracksCollection.findOne(searchObject, function(error, track) {
      if(track===null){
      return response.status(404).json({Error:`Track not found`})
      }
      response.status(200).json(error || track)
      client.close()
    })
  })
})

// function isValidHex(stringId) {
// var testId = parseInt(stringId,24);
//   console.log(stringId)
//   console.log(testId)
// return (testId.toString(24) ===stringId.toLowerCase())
// }

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
