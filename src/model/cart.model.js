// 导入sqluelize的连接
const seq = require('../db/seq')
const {DataTypes} = require("sequelize");

// 定义cart模型
const Cart = seq.define(
    'yl_carts',
    {
        goods_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '商品的id'
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '用户的id'
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: '商品数量'
        },
        selected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: '是否被选中'
        }
    }
)

// 同步数据（建表）
// Cart.sync({ force : true})

// 导出cart模型
module.exports = Cart
