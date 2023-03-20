// 导入koa-router包
const Router = require('koa-router')
// 实例化对象
const router = new Router({prefix: '/address'})
// 编写路由规则
// 添加地址接口：登录、格式
router.post('/', (ctx) => {
    ctx.body = '添加地址成功'
})
// 导出router对象
module.exports = router
