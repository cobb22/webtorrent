require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

// database connection 
mongoose.connect(process.env.DBURL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database connected'))

// middlewares
app.use(cors())
app.use(express.json())

// routers 
const userRouter = require('./routes/user')
app.use('/user', userRouter)
const downloadsRouter = require('./routes/downloads')
app.use('/downloads', downloadsRouter)



// linking client 
const path = require("path");

app.use(express.static(path.resolve(__dirname, "./client/public")));

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/public", "index.html"));
});

app.listen(process.env.PORT || 3003, () => {
    console.log(`WebTorrent api is running on port ${process.env.PORT}`)
})