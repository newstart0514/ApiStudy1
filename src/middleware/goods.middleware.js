const {goodsFormatError} = require('../constant/err.type')

// 利用第三方库对商品信息进行验证
const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_name: {type: 'string', required: true},
            goods_price: {type: 'number', required: true},
            goods_num: {type: 'number', required: true},
            goods_img: {type: 'string', required: true}
        })
    }catch (err) {
        console.error(err)
        goodsFormatError.result = err
        return ctx.app.emit('error', goodsFormatError, ctx)
    }
    await next()
}

module.exports = {
    validator
}