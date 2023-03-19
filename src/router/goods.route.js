const Router = require('koa-router')
const {auth,isAdmin} = require('../middleware/auth.middleware')
const {upload,create,update,remove,restore,findAll} = require('../controller/goods.controller')
const {validator} = require("../middleware/goods.middleware");
const router = new Router({prefix: '/goods'})

// 商城图片上传接口
router.post('/upload', auth, isAdmin, upload)
// 商品发布接口
router.post('/', auth, isAdmin, validator, create)
// 修改商品接口
router.put('/:id', auth, isAdmin, validator, update)
// 删除商品接口（暴力删除法，不是最好的办法）
// router.delete('/:id', auth, isAdmin, remove)
// 商品上架
router.post('/:id/off', auth, isAdmin, remove)
// 商品上架
router.post('/:id/on', auth, isAdmin, restore)
// 获取商品列表
router.get('/', findAll)

module.exports = router