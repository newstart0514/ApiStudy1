const { APP_PORT } = require('./config/config.default')

const app = require('./app')
app.listen(APP_PORT, () => {
    console.log(`服务已经正常启动在：http://localhost:${APP_PORT}`)
})