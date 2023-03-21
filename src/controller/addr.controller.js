const {createAddr, findAllAddr, updateAddr, removeAddr, setDefaultAddr} = require('../service/addr.service')

class AddrController {
    // 地址添加
    async create(ctx) {
        // 解析数据，user_id,consignee,phone,address
        const user_id = ctx.state.user.id
        const {consignee, phone, address} = ctx.request.body
        // 操作数据库
        const res = await createAddr({user_id, consignee, phone, address})
        // 返回结果
        ctx.body = {
            code: 0,
            message: '添加地址成功',
            result: res
        }
    }
    // 获取地址列表
    async findAll(ctx) {
        // 解析数据
        const user_id = ctx.state.user.id
        // 操作数据库
        const res = await findAllAddr(user_id)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '获取列表成功',
            result: res
        }
    }
    // 更新地址的操作
    async update(ctx) {
        // 解析数据
        const id = ctx.request.params.id
        // const {consignee, phone, address} = ctx.request.body
        // 操作数据库
        // const res = await updateAddr(id, {consignee, phone, address})
        const res = await updateAddr(id, ctx.request.body)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '更新地址成功',
            result: res
        }
    }
    // 删除地址的操作
    async remove(ctx) {
        // 解析数据
        const id = ctx.request.params.id
        // 操作数据库
        const res = await removeAddr(id)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '删除地址成功',
            result: res
        }
    }
    // 设置默认地址操作
    async setDefault(ctx) {
        // 解析数据
        const user_id = ctx.state.user.id
        const id = ctx.request.params.id
        // 操作数据库
        const res = await setDefaultAddr(user_id, id)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '设置默认地址成功',
            result: res
        }
    }
}

module.exports = new AddrController()
