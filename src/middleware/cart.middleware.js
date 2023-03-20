const {cartFormatError} = require('../constant/err.type')

// 闭包实现验证方法供多个规则使用
const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            console.error(err)
            cartFormatError.result = err
            return ctx.app.emit('error', cartFormatError, ctx)
        }
        await next()
    }
}

module.exports = {
    validator
}
