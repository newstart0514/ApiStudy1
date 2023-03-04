const fs = require('fs')
const Router = require('koa-router')
const router = new Router()

// 使用node内置fs模块同步读取文件
fs.readdirSync(__dirname).forEach(filename => {
    if(filename !== 'index.js') {
        let routeObject = require(`./${filename}`)
        router.use(routeObject.routes())
    }
})

module.exports = router