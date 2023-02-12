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