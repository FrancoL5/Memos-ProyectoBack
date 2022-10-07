import { DataTypes } from "sequelize"
import { sequelize } from "../utils/sequelize.js"

const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_name: { type: DataTypes.STRING, allowNull:false, unique:true },
    name: { type: DataTypes.STRING, allowNull:false },
    last_name: { type: DataTypes.STRING, allowNull:false },
    country: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull:false },
    admin:{type: DataTypes.BOOLEAN}
})

export default User
