// 导入koa-router
const Router = require('koa-router')

// 中间件
const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/cart.middleware')
// 控件器
const {add, findAll, update, remove, selectAll, unselectAll} = require('../controller/cart.controller')

// 实例化router对象
const router = new Router({prefix: '/carts'})

// 编写路由规则
// 添加到购物车接口：登录、格式
router.post('/', auth, validator({goods_id: 'number'}), add)
// 获取购物车列表接口
router.get('/', auth, findAll)
// 更新购物车接口
router.patch('/:id', auth, validator({
        number: {type: 'number', required: false},
        selected: {type: 'bool', required: false}
    }),
    update
)
// 删除购物车
router.delete('/', auth, validator({ids: 'array'}), remove)
// 全选
router.post('/selectAll', auth, selectAll)
// 全不选
router.post('/unselectAll', auth, unselectAll)

// 导出router对象
module.exports = router
