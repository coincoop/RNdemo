const Router = require('express')
const {createHouse} = require('../controllers/houseController')

const houseRouter =Router();

houseRouter.post('/create-house',createHouse )

module.exports = houseRouter