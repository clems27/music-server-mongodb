const express = require('express')
const app = express()

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
})

app.listen(process.env.PORT)
