import {DataTypes} from "sequelize"
import {sequelize} from "../utils/sequelize.js"
import User from "./User.js"

const Message = sequelize.define("Message", {
    id:{type:DataTypes.BIGINT, primaryKey:true, autoIncrement:true},
    content: {type: DataTypes.STRING, allowNull:false},
    time: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    receiver: {type:DataTypes.BIGINT, allowNull:false},
    view: {type:DataTypes.BOOLEAN, defaultValue:false}
})

User.hasOne(Message, {
    foreignKey:"user_id",
})
Message.belongsTo(User, {
    foreignKey:"user_id"
})

export default Message