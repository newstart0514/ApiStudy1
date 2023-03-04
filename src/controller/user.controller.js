const { createUser,getUserInfo,updateUserInfoById } = require("../service/user.service")
const {userRegisterError} = require("../constant/err.type");
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

class UserController {
    async register(ctx, next) {
        // 获取数据
        // console.log(ctx.request.body)
        const {user_name, password} = ctx.request.body
        // 操作数据库
        try {
            const res = await createUser(user_name, password)
            // console.log(res)
            // 返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name,
                }
            }
        } catch (err) {
            console.error(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    async login(ctx, next) {
        // 获取数据
        const { user_name } = ctx.request.body
        // 获取用户信息（在payload里面记录id，user_name，is_admin）
        try {
            // 根据用户名字获取到用户信息,并去除password字段
            const {password, ...res} = await getUserInfo({user_name})
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'})
                }
            }
        }catch (err) {
            console.error('用户登录失败', err)
        }
    }

    async changePassword(ctx, next) {
        // 获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        // console.log(id, password)
        // 操作数据库
        if(await updateUserInfoById({id, password})) {
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: ''
            }
        } else {
            ctx.body = {
                code: 10007,
                message: '修改密码失败',
                result: ''
            }
        }
        // 返回结果
    }
}

module.exports = new UserController()