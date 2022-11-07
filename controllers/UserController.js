const { Router } = require('express')
const m$user = require('../modules/user.module')

const UserController = Router()

UserController.get('/', async (req, res) => {
    cons list = await m$user.listener()

    //Helpers Response
})

module.exports = UserController