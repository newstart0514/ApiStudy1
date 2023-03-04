const bcrypt = require('bcryptjs')
const {getUserInfo} = require("../service/user.service");
const {userFormateError, userExistError, userRegisterError, userDoesNotExistError, userLoginError, invalidPassword} = require("../constant/err.type");
const userValidator = async (ctx, next) => {
    const {user_name , password} = ctx.request.body
    // 判断合法性
    if(!user_name || !password) {
        console.error('用户或密码为空',ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}

const verifyUser = async (ctx, next) => {
    const {user_name} = ctx.request.body
    // 判断合理性
    // if (await getUserInfo({user_name})) {
    //     ctx.app.emit('error', userExistError, ctx)
    //     return
    // }
    try {
        const res = await getUserInfo({user_name})
        if (res) {
            console.error('用户名已经存在', {user_name})
            ctx.app.emit('error', userExistError, ctx)
            return
        }
    }catch (err) {
        console.error('获取用户信息错误', err)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}

// 密码加密
const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    // 生成盐
    const salt = bcrypt.genSaltSync(10)
    // 根据盐生成哈希值
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}

const verifyLogin = async (ctx, next) => {
    const {user_name , password} = ctx.request.body
    // 判断用户是否存在(不存在就报错)
    try {
        const res = await getUserInfo({user_name})
        if (!res) {
            console.error('用户名不存在',{user_name})
            ctx.app.emit('error', userDoesNotExistError, ctx)
            return
        }
        // 密码是否匹配(不匹配就报错)
        if(!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    }catch (err) {
        console.error('获取用户错误！',err)
        return ctx.app.emit('error', userLoginError, ctx)
    }
    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
}