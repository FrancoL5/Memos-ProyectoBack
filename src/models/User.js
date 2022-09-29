import {DataTypes} from "sequelize"
import {sequelize} from "../utils/sequelize.js"

const User = sequelize.define("User",{
    id:{type:DataTypes.BIGINT, primaryKey:true, autoIncrement:true},
    user_name: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    country: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    password: {type: DataTypes.BIGINT}
});

export default User