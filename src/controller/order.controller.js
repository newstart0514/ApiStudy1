const {createOrder, findAllOrder, updateOrder} = require('../service/order.service')

class OrderController {
    // 生成订单
    async create(ctx) {
        // 准备数据
        const user_id = ctx.state.user.id
        const {address_id, goods_info, total} = ctx.request.body
        const order_number = `YLSHOP${Date.now()}`
        // 操作数据库
        const res = await createOrder({user_id, address_id, goods_info, total, order_number})
        // 返回结果
        ctx.body = {
            code: 0,
            message: '生成订单成功！',
            result: res
        }
    }
    // 获取订单列表
    async findAll(ctx) {
        // 准备数据
        const {pageNum=1, pageSize=10, status=0} = ctx.request.query
        // 操作数据库
        const res = await findAllOrder(pageNum, pageSize, status)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '获取订单列表成功',
            result: res
        }
    }
    // 更新订单状态
    async update(ctx) {
        // 准备数据
        const id = ctx.request.params.id
        const {status} = ctx.request.body
        // 操作数据库
        const res = await updateOrder(id, status)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '更新订单成功',
            result: res
        }
    }
}

module.exports = new OrderController()
