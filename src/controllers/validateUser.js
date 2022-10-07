import bcrypt from "bcrypt"
import User from "../models/User.js"


const validateUser = async (req,res) => {
    try{
        const {id} = req.params
        const {password} = req.body
    
        const {dataValues:{passwordDB}} = (await User.findAll({attributes:["password"] ,where: {user_id:id}}))[0]

        return res.status(200).json(await bcrypt.compare(passwordDB, password))
    }catch(err){
        console.log(err)
    }
    
}

export default validateUser