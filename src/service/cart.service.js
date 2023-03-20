const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')
const {Op, where} = require("sequelize");

class CartService {
    // 添加购物车
    async createOrUpdate(user_id, goods_id) {
        // 根据user_id和goods_id同时去查找有没有这个记录
        let res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    goods_id
                }
            }
        })
        if(res) {
            // 已经存在一条记录
            await res.increment('number')
            return await res.reload()
        } else {
            return await Cart.create({
                user_id,
                goods_id
            })
        }
    }
    // 获取购物车列表
    async findCarts(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize
        const {count, rows} = await Cart.findAndCountAll({
            offset: offset,
            limit: pageSize * 1,
            attributes: ['id','number','selected'],
            include: {
                model: Goods,
                as: 'goods_info',
                attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
            }
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
    // 更新购物车
    async updateCarts(params) {
        // 解构出三个值
        const {id, number, selected} = params
        const res = await Cart.findByPk(id)
        if (!res) return ''
        number !== undefined ? (res.number = number) : ''
        selected !== undefined ? (res.selected = selected) : ''
        return await res.save()
    }
    // 删除购物车
    async removeCart(ids) {
        return await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }
}

module.exports = new CartService()
