const Koa = require('koa')
const { koaBody } = require('koa-body')

const errHandler = require('./errHandler')

const router = require('../router')

const app = new Koa()

app.use(koaBody())
app.use(router.routes())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app