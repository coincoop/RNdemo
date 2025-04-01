const express = require('express')
const cor = require('cors')
require('dotenv').config();
const authRouter = require('./src/routers/authRouter')
const houseRouter = require('./src/routers/houseRouter')
const connectDB = require('./src/configs/connectDb')
const app = express()
const {errorMiddleHandle} =require('./middlewares/errorMiddleware')

const PORT =3001

app.use(cor())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/house', houseRouter)

connectDB();
app.use(errorMiddleHandle)

app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log(`Server starting at http://localhost:${PORT}`);
    
})