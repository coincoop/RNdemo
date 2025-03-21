const express = require('express')
const cor = require('cors')
const authRouter = require('./router/authRouter')
const app = express()

const PORT =3001

app.use(cor())
app.use(express.json())

app.use('/auth', authRouter)

app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log(`Server starting at http://localhost:${PORT}`);
    
})