import bcrypt from "bcrypt"
import User from "../models/User.js"


const validateUser = async (req,res) => {
    try{
        const {id} = req.params
        const {password} = req.body
        const dataValues = (await User.findAll({attributes:["password"] ,where: {user_name:id}}))[0] 
        if(dataValues){
            const {password:passwordDB} = dataValues
            return res.status(200).json(await bcrypt.compare( password, passwordDB))
        }else{
            return res.status(200).json(false)
        }
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
    
}

export default validateUser