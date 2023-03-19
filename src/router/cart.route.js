// 导入koa-router
const Router = require('koa-router')

// 中间件
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
// 控件器
const {add} = require('../controller/cart.controller')
const {findAll} = require('../controller/cart.controller')

// 实例化router对象
const router = new Router({prefix: '/carts'})

// 编写路由规则
// 添加到购物车接口：登录、格式
router.post('/', auth, validator, add)

// 获取购物车列表接口
router.get('/', auth, findAll)

// 导出router对象
module.exports = router
