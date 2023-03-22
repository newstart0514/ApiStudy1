// 导入koa-router包
const Router = require('koa-router')
// 实例化对象
const router = new Router({prefix: '/orders'})
// 中间件/控制器
const {auth} = require("../middleware/auth.middleware");
const {validator} = require("../middleware/order.middleware");
const {create, findAll, update} = require('../controller/order.controller')
// 编写路由规则
// 生成订单接口
router.post('/', auth, validator({
    address_id: 'int',
    goods_info: 'string',
    total: 'string'
}), create)
// 获取订单列表接口
router.get('/', auth, findAll)
// 更新订单状态接口
router.patch('/:id', auth, validator({status: 'number'}),update)
// 导出router对象
module.exports = router
