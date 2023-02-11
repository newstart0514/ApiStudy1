const Koa = require('koa')

const userRouter = require('../router/uesr.route')

const app = new Koa()

app.use(userRouter.routes())

module.exports = app