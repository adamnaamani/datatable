const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const app = express()
const port = process.env.PORT || 5000

app.use(serveStatic(__dirname))
app.listen(port, () => {
  console.log('Server started at http://localhost:' + port)
})