const Koa = require('koa')
const { koaBody } = require('koa-body')

const userRouter = require('../router/uesr.route')

const app = new Koa()

app.use(koaBody())
app.use(userRouter.routes())

module.exports = app