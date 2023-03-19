// 导入koa-router
const Router = require('koa-router')

// 中间件
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
// 控件器


// 实例化router对象
const router = new Router({prefix: '/carts'})

// 编写路由规则
// 添加到购物车接口：登录、格式
router.post('/', auth, validator, (ctx) => {
    ctx.body = '添加到购物车成功!'
})

// 导出router对象
module.exports = router
