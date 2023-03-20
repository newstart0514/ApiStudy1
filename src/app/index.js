const Koa = require('koa')
const {koaBody} = require('koa-body')
const path = require('path')
// 解决无法通过路径请求图片资源的问题
const KoaStatic = require('koa-static')
// 使用统一的参数格式校验
const parameter = require('koa-parameter')

const errHandler = require('./errHandler')

const router = require('../router')

const app = new Koa()

app.use(koaBody({
        // 开启文件上传
        multipart: true,
        formidable: {
            // 文件上传存放路径，不推荐使用相对路径
            // 在option里的相对路径，不是相对的当前文件，而是相对于process.cwd()
            uploadDir: path.join(__dirname, '../upload'),
            // 保留文件扩展名
            keepExtensions: true
        },
        // 支持挂载请求参数的请求方法设置
        parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
    }
))
// 配置静态资源的绝对路径
app.use(KoaStatic(path.join(__dirname, '../upload')))
// 配置参数格式校验
app.use(parameter(app))
app.use(router.routes())
// 增加接口的方法请求限制
app.use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app
