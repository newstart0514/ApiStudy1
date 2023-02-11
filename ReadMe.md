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