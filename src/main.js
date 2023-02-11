const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
    ctx.body = 'hello api'
})

app.listen(4000, () => {
    console.log('服务已经正常启动在http://localhost:4000')
})