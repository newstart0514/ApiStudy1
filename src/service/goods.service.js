const Goods = require('../model/goods.model')
const {where} = require("sequelize");

class GoodsService {
    // 上传商品
    async createGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }
    // 更新商品
    async updateGoods(id, goods) {
        const res = await Goods.update(goods, {where: { id }})
        return res[0] > 0
    }
    // 删除商品（或商品下架）
    async removeGoods(id) {
        const res = await Goods.destroy({where: {id}})
        return res > 0
    }
    // 商品上架
    async restoreGoods(id) {
        const res = await Goods.restore({where: {id}})
        return res > 0
    }
    // 获取商品列表
    async findGoods(pageNum, pageSize) {
        // // 获取数据总数
        // const count = await Goods.count()
        // // 获取分页的具体数据
        // const offset = (pageNum - 1) * pageSize
        // const row = await Goods.findAll({offset: offset, limit: pageSize * 1})
        const offset = (pageNum - 1) * pageSize
        const {count, rows} = await Goods.findAndCountAll({offset: offset, limit: pageSize * 1})
        // 返回结果
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }
}

module.exports = new GoodsService()
