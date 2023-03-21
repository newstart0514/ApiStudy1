// 导入seq的连接
const seq = require('../db/seq')
const {DataTypes} = require("sequelize");
// 建表，定义字段
const Address = seq.define('yl_address', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人的姓名'
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: '收货人手机号'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货地址'
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '是否为默认地址'
    }
})
// 同步sync
// Address.sync({force: true})
// 导出模型对象
module.exports = Address
