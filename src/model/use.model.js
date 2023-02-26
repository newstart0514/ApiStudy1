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
    timestamps: true
})

// 强制同步表到数据库（创建数据表）
// User.sync({force: true})

module.exports = User