const fs = require('fs')
const Router = require('koa-router')
const router = new Router()

indexRouter = new Router({
    prefix: '/'
})

indexRouter.get('/', (ctx, next) => {
    ctx.body = '🥰 当你看到这句话时，项目已经正常启动啦~，本项目示例文档为：https://console-docs.apipost.cn/preview/4dd08dbb370bfe30/faac5997774e01ef'
})

router.use(indexRouter.routes())

// 使用node内置fs模块同步读取文件
fs.readdirSync(__dirname).forEach(filename => {
    if(filename !== 'index.js') {
        let routeObject = require(`./${filename}`)
        router.use(routeObject.routes())
    }
})

module.exports = router
