require("dotenv").config();
const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user')
const restRoomRouter = require('./routers/restRoom')
const bookRouter = require('./routers/book')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(restRoomRouter)
app.use(bookRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})