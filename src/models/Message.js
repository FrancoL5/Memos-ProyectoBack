import {DataTypes} from "sequelize"
import {sequelize} from "../utils/sequelize.js"
import User from "./User.js"

const Message = sequelize.define("Message", {
    id:{type:DataTypes.BIGINT, primaryKey:true, autoIncrement:true},
    content: {type: DataTypes.STRING, allowNull:false},
    time: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    receiver_id: {type:DataTypes.BIGINT, allowNull:false},
    receiver: {type:DataTypes.STRING, allowNull:false},
    view: {type:DataTypes.BOOLEAN, defaultValue:false}
})

User.hasOne(Message, {
    foreignKey:"user_id",
})
Message.belongsTo(User, {
    foreignKey:"user_id"
})

User.hasOne(Message, {
    foreignKey:"user_name",
    sourceKey:"user_name"
})
// Message.belongsTo(User, {
//     foreignKey:"user_name",
//     sourceKey:"user_name"
// })

export default Message