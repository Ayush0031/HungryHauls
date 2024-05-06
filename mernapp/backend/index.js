
const express = require('express')
const dotenv=require('dotenv')
dotenv.config()
const app = express()
const cors=require('cors')
const port =process.env.PORT || 5000
const mongoDB=require('./db')
app.use(cors({
    origin:["https://HungryHauls.vercel.app"],
    method:["POST","GET"],
    credentials:true
}))

mongoDB()


app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth',require("./Routes/Auth"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})