const Order = require('../model/order.model')

class OrderService {
    // 生成订单
    async createOrder(orderInfo) {
        return await Order.create(orderInfo)
    }
    // 获取订单列表
    async findAllOrder(pageNum, pageSize, status) {
        const {count, rows} = await Order.findAndCountAll({
            attributes: ['goods_info', 'total', 'order_number', 'status'],
            where: {
                status
            },
            offset: (pageNum - 1) * pageSize,
            limit: pageSize * 1
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
    // 更新订单状态
    async updateOrder(id, status) {
        return await Order.update({status}, {where: {id}})
    }
}

module.exports = new OrderService()
