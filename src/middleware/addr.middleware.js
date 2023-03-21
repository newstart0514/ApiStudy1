const {addrFormatError} = require('../constant/err.type')

// 闭包进行多种规则的验证
const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        }catch (err) {
            console.error(err)
            addrFormatError.result = err
            ctx.app.emit('error', addrFormatError, ctx)
        }
        await next()
    }
}

module.exports = {
    validator
}
