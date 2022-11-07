const UserController = require("./controllers/UserController")
const ExpanseTracker = require("./controllers/ExpanseTracker")
const { route } = require("./controllers/UserController")
const ExpanseTracker = require("./controllers/ExpanseTracker")

const _routes = [
    // http://localhost:8000/api/users
    ['users', UserController],
    // http://localhost:8000/api/expanse
    ['expanse', ExpanseTracker]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes