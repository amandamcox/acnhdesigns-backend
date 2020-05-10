const usersRouter = require('express').Router()
const { getAll, getUser, createNewUser, loginUser } = require('./controller')

usersRouter.get('/', getAll)
usersRouter.get('/:userId', getUser)
usersRouter.post('/', createNewUser)
usersRouter.post('/login', loginUser)

module.exports = usersRouter

/* TO DO:
    - Restrict access to endpoints so only client can get information
*/
