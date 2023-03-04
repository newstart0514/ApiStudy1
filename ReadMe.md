# 项目的初始化
## npm初始化
```powershell
npm init -y
```
生成package.json文件：
- 记录项目的依赖

## git的初始化
```powershell
git init
```
生成.git隐藏文件夹，git的本地仓库

## 创建readme文件

# 搭建项目
## 搭建koa框架
```powershell
npm install koa
```
## 编写基础的app
```javascript
const Koa = require('koa')
const app = new Koa()
app.use((ctx, next) => {
    ctx.body = 'hello api'
})
app.listen(4000, () => {
    console.log('服务已经正常启动在http://localhost:4000')
})
```
## 测试
使用node命令运行
```powershell
node main.js
```

# 项目的基本优化
## 自动重启服务
安装nodemon工具
```powershell
npm install nodemon -D
```
编写package.json脚本
```json
"scripts": {
    "dev": "nodemon ./src/main.js"
},
```
执行npm run dev启动服务

## 读取配置文件
安装dotenv，读取根目录的.env文件，将配置写process.env中
```powershell
npm install dotenv
```
创建.env文件
```env
APP_PROT=8000
```
创建src/config/config.defalut.js
```javascript
const dotenv = require('dotenv')
dotenv.config()
module.exports = process.env
```
改写main.js
```javascript
const Koa = require('koa')
const { APP_PORT } = require('./config/config.default')
const app = new Koa()
app.use((ctx, next) => {
    ctx.body = 'hello api'
})
app.listen(APP_PORT, () => {
    console.log(`服务已经正常启动在：http://localhost:${APP_PORT}`)
})
```

# 添加路由
路由：根据不同的URL，调用不同的URL，调用对应的处理函数
## 安装koa-router
```powershell
npm install koa-router
```
### 步骤
1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件

## 编写路由
创建src/router目录，编写user.route.js
```javascript
const Router = require('koa-router')
const router = new Router({
    prefix: '/users'
})
// GET /users/
router.get('/', (ctx, next) => {
    ctx.body = 'hello users'
})
module.exports = router
```

## 改写main.js
```javascript
const Koa = require('koa')
const { APP_PORT } = require('./config/config.default')
const userRouter = require('./router/uesr.route')
const app = new Koa()
app.use(userRouter.routes())
app.listen(APP_PORT, () => {
    console.log(`服务已经正常启动在：http://localhost:${APP_PORT}`)
})
```

# 目录结构的优化
## 将HTTP服务和app业务拆分
创建src/app/index.js
```javascript
const Koa = require('koa')
const userRouter = require('../router/uesr.route')
const app = new Koa()
app.use(userRouter.routes())
module.exports = app
```
改写main.js
```javascript
const { APP_PORT } = require('./config/config.default')
const app = require('./app')
app.listen(APP_PORT, () => {
    console.log(`服务已经正常启动在：http://localhost:${APP_PORT}`)
})
```

## 将路由以及控制器拆分
路由：解析URL，分布给控制器对应的方法
控制器：处理不同的业务
改写user.route.js文件
```javascript
const Router = require('koa-router')
const { register, login } = require('../controller/user.controller')
const router = new Router({
    prefix: '/users'
})
// 注册接口
router.post('/register', register)
// 登录接口
router.post('/login', login)
module.exports = router
```
创建controller/user.controller.js
```javascript
const Router = require('koa-router')
const { register, login } = require('../controller/user.controller')
const router = new Router({
    prefix: '/users'
})
// 注册接口
router.post('/register', register)
// 登录接口
router.post('/login', login)
module.exports = router
```

# 解析body
## 安装koa-body
```powershell
npm install koa-body
```
## 注册中间件
改写app/index.js
```javascript
const Koa = require('koa')
const { koaBody } = require('koa-body')
const userRouter = require('../router/uesr.route')
const app = new Koa()
app.use(koaBody())
app.use(userRouter.routes())
module.exports = app
```

## 解析数据请求
改写user.controller.js
```javascript
const { createUser } = require("../service/user.service")
class UserController {
    async register(ctx, next) {
        // 获取数据
        // console.log(ctx.request.body)
        const {user_name, password} = ctx.request.body
        // 操作数据库
        const res = await createUser(user_name, password)
        console.log(res)
        ctx.body = '用户注册成功'
    }
    async login(ctx, next) {
        ctx.body = '登录成功'
    }
}
module.exports = new UserController()
```

## 拆分service层
service层主要是做数据库处理
创建src/service/user.service.js
```javascript
class UserService {
    async createUser(user_name, password) {
        // 写入数据库
        return '写入数据库成功'
    }
}
module.exports = new UserService()
```

# 数据库操作
Sequelize ORM数据库工具
ORM:对象关系映射
- 数据表映射（对应）一个类
- 数据表中的数据行（记录）对应一个对象
- 数据表字段对应对象属性
- 数据表的操作对应对象的方法

## 安装sequelize
```powershell
npm i mysql2 sequelize
```

## 连接数据库
src/db/seq.js
```javascript
const {MYSQL_HOST,MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB} = require('../config/config.default')
const { Sequelize } = require('sequelize')

const seq = new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
});

// 验证数据库连接
// seq.authenticate().then(() => {
//     console.log('数据库连接成功！')
// }).catch((err) => {
//     console.log('数据库连接失败',err)
// })

module.exports = seq;
```

## 编写配置文件
```env
...
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=123456
MYSQL_DB=youliShopping
```

# 创建User模型
## 拆分Model层
sequelize主要通过model对应数据表
创建src/model/user.model.js
```javascript
const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型
const User = seq.define('yl_User', {
    // id会被自动创建，管理
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员，0表示不是管理员，1表示是管理员'
    }
}, {
    // 是否需要时间戳记录
    timestamps: true
})

// 强制同步表到数据库（创建数据表）
// User.sync({force: true})

module.exports = User
```

# 添加用户入库
修改user.service.js文件：
```javascript
const User = require('../model/use.model')

class UserService {
    async createUser(user_name, password) {
        // 插入数据
        // User.create({
        //     // 表的字段
        //     user_name: user_name,
        //     password: password,
        // })
        // await表达式：promise对象的值
        const res = await User.create({
            user_name,
            password
        })
        // console.log(res)
        // 只需要res里面的dataValues结果
        return res.dataValues
    }
}

module.exports = new UserService()
```
修改user.controller.js文件
```javascript
const { createUser } = require("../service/user.service")

class UserController {
    async register(ctx, next) {
        // 获取数据
        // console.log(ctx.request.body)
        const {user_name, password} = ctx.request.body
        // 操作数据库
        const res = await createUser(user_name, password)
        console.log(res)
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name,
            }
        }
    }

    async login(ctx, next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController()
```

# 错误处理
修改user.service.js文件，增加查询函数
```javascript
const User = require('../model/use.model')

class UserService {
    async createUser(user_name, password) {
        // 插入数据
        // await表达式：promise对象的值
        const res = await User.create({
            user_name,
            password
        })
        // console.log(res)
        // 只需要res里面的dataValues结果
        return res.dataValues
    }

    async getUserInfo({id, user_name, password, is_admin}) {
        const whereOpt = {}
        id && Object.assign(whereOpt, {id})
        user_name && Object.assign(whereOpt, {user_name})
        password && Object.assign(whereOpt, {password})
        is_admin && Object.assign(whereOpt, {is_admin})
        // 查询字段
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }
}

module.exports = new UserService()
```
修改user.controller.js文件，添加合理性以及合法性判断
```javascript
const { createUser, getUserInfo } = require("../service/user.service")

class UserController {
    async register(ctx, next) {
        // 获取数据
        // console.log(ctx.request.body)
        const {user_name, password} = ctx.request.body
        // 判断合法性
        if(!user_name || !password) {
            console.error('用户或密码为空',ctx.request.body)
            ctx.status = 400
            ctx.body = {
                code: '10001',
                message: '用户名或者密码为空',
                result: ''
            }
            return
        }
        // 判断合理性
        if (await getUserInfo(user_name)) {
            ctx.status = 409
            ctx.body = {
                code: '10002',
                message: '用户已经存在',
                result: ''
            }
            return
        }
        // 操作数据库
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
    }

    async login(ctx, next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController()
```

# 拆分中间件
修改user.middleware.js文件：
```javascript
const {getUserInfo} = require("../service/user.service");
const {userFormateError, userExistError, userRegisterError} = require("../constant/err.type");
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

module.exports = {
    userValidator,
    verifyUser
}
```
在constant文件夹下创建err.type.js，内容如下：
```javascript
module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
    },
    userExistError: {
        code: '10002',
        message: '用户已经存在',
        result: ''
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册错误',
        result: ''
    }
}
```
修改user.controller.js捕获异步函数调用的错误：
```javascript
const { createUser } = require("../service/user.service")
const {userRegisterError} = require("../constant/err.type");

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
        ctx.body = '登录成功'
    }
}

module.exports = new UserController()
```
修改user.route.js将检验合理性以及合法性设置为前置条件：
```javascript
const { createUser } = require("../service/user.service")
const {userRegisterError} = require("../constant/err.type");

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
        ctx.body = '登录成功'
    }
}

module.exports = new UserController()
```

# 加密
在将密码保存在数据库之前，我们需要对密码进行加密
## 安装bcryptjs
```powershell
npm i bcryptjs
```
## 使用bcryptjs
在user.middleware.js文件下添加然后对外暴露：
```javascript
const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    // 生成盐
    const salt = bcrypt.genSaltSync(10)
    // 根据盐生成哈希值
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}
```
修改user.route.js文件下注册接口的语句：
```javascript
// 注册接口
router.post('/register', userValidator, verifyUser , crpytPassword, register)
```

# 验证登录
在中间件里面添加验证方法，即修改user.middleware.js文件，注意需要暴露：
```javascript
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
```
添加错误类型,即在err.type.js文件下添加内容：
```javascript
    userLoginError: {
        code: '10005',
        message: '用户登录失败',
        result: ''
    },
    invalidPassword: {
        code: '10006',
        message: '密码错误',
        result: ''
    }
```
修改user.route.js下的登录接口：
```javascript
// 登录接口
router.post('/login', userValidator, verifyLogin, login)
```

# 用户的认证
登录成功后，给用户颁发一个token，用户在以后的每一次请求中携带这个令牌。
jwt：JSONWEBTOKEN
- header：头部
- payload：载荷
- signature：签名（保证安全性和有效性）
## 安装jsonwebtoken
```powershell
npm install jsonwebtoken
```
## 使用
修改user.controller.js文件：
```javascript
const { createUser,getUserInfo } = require("../service/user.service")
const {userRegisterError} = require("../constant/err.type");
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

class UserController {
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
}
module.exports = new UserController()
```
增加全局私钥（修改.env文件）
```.env
JWT_SECRET=youli
```

# 用户认证
首先先修改user.route.js文件的内容：
```javascript
// 修改密码接口
router.patch('/', auth, crpytPassword, (ctx, next) => {
    ctx.body = '修改密码成功'
})
```
接下来开始写user.middleware.js文件的内容:
```javascript
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')
const {tokenExpiredError, invalidToken} = require("../constant/err.type");
const auth = async (ctx, next) => {
    const {authorization} = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        // user包含payload的信息(id, user_name, is_admin)
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    }catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已经过期了！', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }
    await next()
}
module.exports = {
    auth
}
```
将错误常量定义一下，即修改err.type.js文件内容:
```javascript
    tokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result: ''
    },
    invalidToken: {
        code: '10102',
        message: '无效的token',
        result: ''
    }
```
# 修改密码
首先，我们在user.route.js中修改修改密码接口：
```javascript
// 修改密码接口
router.patch('/', auth, crpytPassword, changePassword)
```
接下来我们在user.controller.js中定义changePassword方法：
```javascript
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
```
涉及到了修改数据库，所以我们修改user.service.js中的内容：
```javascript
    async updateUserInfoById({id, user_name, password, is_admin}) {
        const whereOpt = {id}
        const newUser = {}
        user_name && Object.assign(newUser, {user_name})
        password && Object.assign(newUser, {password})
        is_admin && Object.assign(newUser, {is_admin})
        const res = await User.update(newUser, {where: whereOpt})
        return res[0] > 0
    }
```