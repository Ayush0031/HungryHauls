const express = require('express')
const app = express()
const mongoDB=require('./db')
const port = 5000
mongoDB()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',require("./Routes/createUser"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})