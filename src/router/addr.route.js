// 导入koa-router包
const Router = require('koa-router')
// 实例化对象
const router = new Router({prefix: '/address'})
// 中间件/控制器
const {auth} = require('../middleware/auth.middleware')
const {validator} = require("../middleware/addr.middleware")
const {create,findAll,update,remove,setDefault} = require("../controller/addr.controller")
// 编写路由规则
// 添加地址接口：登录、格式
router.post('/', auth, validator({
    consignee: 'string',
    phone: {type: 'string', format: /^1\d{10}$/},
    address: 'string'
}), create)
// 获取地址列表的接口
router.get('/', auth, findAll)
// 更新地址接口
router.put('/:id', auth, validator({
    consignee: 'string',
    phone: {type: 'string', format: /^1\d{10}$/},
    address: 'string'
}), update)
// 删除地址接口
router.delete('/:id', auth, remove)
// 设置默认接口
router.patch('/:id', auth, setDefault)
// 导出router对象
module.exports = router
