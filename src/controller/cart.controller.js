const {createOrUpdate, findCarts} = require('../service/cart.service')

class CartController {
    // 将商品添加到购物车
    async add(ctx) {
        // 解析数据：user_id,goods_id
        const user_id = ctx.state.user.id
        const goods_id = ctx.request.body.goods_id
        // 操作数据库
        const res = await createOrUpdate(user_id, goods_id)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '添加到购物车成功',
            result: res
        }
    }
    // 获取商品列表
    async findAll(ctx) {
        // 解析请求参数
        const {pageNum = 1, pageSize = 10} = ctx.request.query
        // 操作数据库
        const res = await findCarts(pageNum, pageSize)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            result: res
        }
    }
}

module.exports = new CartController()
