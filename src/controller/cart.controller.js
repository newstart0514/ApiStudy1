const {createOrUpdate, findCarts, updateCarts, removeCart, selectAllCarts, unselectAllCarts} = require('../service/cart.service')
const {cartFormatError} = require("../constant/err.type");

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
    // 更新购物车
    async update(ctx) {
        // 解析参数
        const {id} = ctx.request.params
        const {number, selected} = ctx.request.body
        if(number === undefined && selected === undefined) {
            cartFormatError.message = 'number和selected不同同时为空'
            return ctx.app.emit('error', cartFormatError, ctx)
        }
        // 操作数据库
        // 这里使用对象形式包裹参数，是防止undefined的影响，是一种间接型的多态
        const res = await updateCarts({id, number, selected})
        // 返回结果
        ctx.body = {
            code: 0,
            message: '更新购物车成功！',
            result: res
        }
    }
    // 删除购物车
    async remove(ctx) {
        // 解析参数
        const {ids} = ctx.request.body
        // 操作数据库
        const res = await removeCart(ids)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '删除购物车商品成功！',
            result: res
        }
    }
    // 全选
    async selectAll(ctx) {
        // 解析参数
        const user_id = ctx.state.user.id
        // 操作数据库
        const res = await selectAllCarts(user_id)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '购物车全选成功',
            result: res
        }
    }
    // 全不选
    async unselectAll(ctx) {
        // 解析参数
        const user_id = ctx.state.user.id
        // 操作数据库
        const res = await unselectAllCarts(user_id)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '全部不选中成功',
            result: res
        }
    }
}

module.exports = new CartController()
