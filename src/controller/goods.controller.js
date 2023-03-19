const path = require('path')
const {fileUploadError, unSuportedFileType, publishGoodsError, invalidPassword,invalidGoodsID} = require('../constant/err.type')
const {createGoods,updateGoods,removeGoods,restoreGoods,findGoods} = require('../service/goods.service')

class GoodsController {
    // 商品图片上传
    async upload(ctx, next) {
        ctx.body = '商品图片上传成功'
        // 提取上传的文件信息
        const {file} = ctx.request.files
        const fileTypes = ['image/jpeg', 'image/png']
        if(file) {
            // 文件上传类型限制
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSuportedFileType, ctx)
            }
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    // 将文件的路径信息提取出来
                    goodsImg: path.basename(file.filepath)
                }
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }
    // 商品创建
    async create(ctx) {
        // 直接调用service层的createGoods方法
        try {
            const {createdAt,updatedAt,...res} = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: res
            }
        }catch (err) {
            console.error(err)
            return ctx.app.emit('error', publishGoodsError, ctx)
        }
    }
    // 商品修改
    async update(ctx) {
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body)
            if(res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功!',
                    result: ''
                }
            }else {
                return ctx.app.emit('error', invalidGoodsID, ctx)
            }
        }catch (err) {
            console.error(err)
        }
    }
    // 商品强行删除
    async remove(ctx) {
        try {
            const res = await removeGoods(ctx.params.id)
            // 硬删除
            // if(res) {
            //     ctx.body = {
            //         code: 0,
            //         message: '删除商品成功！',
            //         result: ''
            //     }
            // } else {
            //     ctx.body = {
            //         code: 500,
            //         message: '删除商品失败',
            //         result: ''
            //     }
            // }
            // 软删除
            if(res) {
                ctx.body = {
                    code: 0,
                    message: '商品下架成功！',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoodsID)
            }
        }catch (err) {
            console.error(err)
        }
    }
    // 商品上架
    async restore(ctx) {
        try {
            const res = await restoreGoods(ctx.params.id)
            if(res) {
                ctx.body = {
                    code: 0,
                    message: '商品上架成功！',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoodsID)
            }
        }catch (err) {
            console.error(err)
        }
    }
    // 商品列表
    async findAll(ctx) {
        // 解析pageNum和pageSize(即为页码以及页面展示数据条数)
        const {pageNum = 1, pageSize = 10} = ctx.request.query
        // 调用数据处理的相关办法
        const res = await findGoods(pageNum, pageSize)
        // 返回结果
        ctx.body = {
            code: 0,
            message: '获取数据成功！',
            result: res
        }
    }
}

module.exports = new GoodsController()