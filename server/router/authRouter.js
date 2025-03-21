const Router = require('express')

const authRouter =Router();

authRouter.get('/hello',(_req, res)=>{
    res.send('hello')
} )

module.exports =authRouter