const m$expanse = require('../modules/expanse.module')
const { Router } = require('express')
const response = require('../helpers/response')

const ExpanseTracker = Router()


ExpanseTracker.get('/expanse', async (req, res) => {
    const expanse = await m$expanse.expensetracker(req.body)

    response.sendResponse(res, list)
})

/**
 * @param {number} user_id
 * @param {string} description
 * 
 * http://localhost:8000/api/expanse
 */
ExpanseTracker.post('/', async (req, res) => {
    const add = await m$expanse.uangMasuk(req.body)

    response.sendResponse(res, add)
})

/**
 * Update todo
 * @param { number } user_id
 * @param { string } description
 * 
 * http:localhost:8000/api/todos
 */
ExpanseTracker.put('/', async (req, res) => {
    // req.body input dari client yang berupa json
    const update = await m$expanse.updateExpanse(req.body)

    // response helper
    response.sendResponse(res, update)
})

/**
 * Delete Todo
 * @param {number} id
 * 
 * http://localhost:8000/api/expanse/:user_id
 */
 ExpanseTracker.delete('/:id', async (req, res) => {
    const del = await m$todo.deleteExpanse(Number(req.params.id))

    response.sendResponse(res, del)
})


module.exports = ExpanseTracker