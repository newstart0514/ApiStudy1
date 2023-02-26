const {MYSQL_HOST,MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB} = require('../config/config.default')
const { Sequelize } = require('sequelize')

const seq = new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
});

// seq.authenticate().then(() => {
//     console.log('数据库连接成功！')
// }).catch((err) => {
//     console.log('数据库连接失败',err)
// })

module.exports = seq;