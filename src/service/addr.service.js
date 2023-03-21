const Address = require('../model/addr.model')

class AddrService {
    // 新建地址
    async createAddr(info) {
        info.is_default = false
        return Address.create(info)
    }

    // 获取地址列表，未做分页
    async findAllAddr(user_id) {
        return await Address.findAll({
            attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
            where: {user_id}
        })
    }

    // 更新地址
    async updateAddr(id, info) {
        return Address.update(info, {
            where: {
                id
            }
        })
    }
    // 删除地址
    async removeAddr(id) {
        return await Address.destroy({where: {id}})
    }
    // 设置默认地址
    async setDefaultAddr(user_id, id) {
        await Address.update({is_default: false}, {where: {user_id}})
        return await Address.update({is_default: true}, {where: {id}})
    }
}

module.exports = new AddrService()
