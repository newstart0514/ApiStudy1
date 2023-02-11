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
npm install nodemon
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
