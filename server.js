const express = require('express')
const mongodb = require('mongodb')

const app = express()

const uri = process.env.DATABASE_URI
 
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
 
app.get('/tracks', function(request, response) {
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

app.get('/tracks/new', function(request, response) {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db("music")
    const tracksCollection = db.collection("tracks")
    const searchObject = {
      year: {
        $gt: 2010
      }
    }
    
    tracksCollection.find(searchObject).toArray(function(error, tracks){
      response.json(error || tracks)
    client.close()
    })
  })
})

app.get('/tracks/old', function(request, response) {
  const client = new mongodb.MongoClient(uri)

  client.connect(function() {
    const db = client.db("music")
    const tracksCollection = db.collection("tracks")
    const searchObject = {
      year: {
        $lte: 2000
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
    if(!isValidHex(stringId)){
        return response.status(400).json({Error:'Invalid Id'})

    }
    const id = new mongodb.ObjectID(stringId) 
    const searchObject = { _id: id }

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

function isValidHex(stringId) {
return stringId.length===24;
  
// var testId = parseInt(stringId,16);
//   console.log(testId, testId.toString(16), stringId.toLowerCase())
// return (testId.toString(16) ===stringId.toLowerCase())
}

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
