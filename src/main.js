const { APP_PORT } = require('./config/config.default')

const app = require('./app')
app.listen(APP_PORT, () => {
    console.log('🚀 项目极速启动完毕！')
    console.log('😎 我是幽离，一个热爱程序开发以及网络安全的小菜狗')
    console.log('😍 如果您喜欢本项目，请为本项目点上个star🌟吧')
    console.log(`🎉 服务已经正常启动在🌐http://localhost:${APP_PORT}`)
    console.log('🥳 欢迎您使用本项目，项目正常运行ing')
    console.log('🤖 正在尝试连接数据库...')
})
