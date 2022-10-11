import Message from "../models/Message.js"
import User from "../models/User.js"

const createMessage = async (req, res) => {
    try {
        const messages = req.body

        console.log(messages);
        await Promise.all(
            messages.receiver.map(async (receiverUser) => {
                const receiver_id = (await User.findOne({attributes:["user_id"], where: {user_name: receiverUser}})).user_id
                if(!receiver_id){
                    throw new Error("Uno de los usuarios no existe")
                }
                return await Message.create({user_id:messages.user_id, user_name: messages.user_name ,content:messages.content, receiver: receiverUser,receiver_id })
            })
        )
        return res.status(200).json(true)
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message)
    }
}

const getMessages = async (req, res) => {
    try {
        const { id, flow } = req.params
        let result = []
        switch (flow) {
            case "sent":
                result = await Message.findAll({
                    attributes: ["id","content", "receiver","receiver_id", "time", "user_id","user_name"],
                    where: { user_id: id },
                })
                break
            case "inbox":
                result = await Message.findAll({
                    attributes: ["id","content", "receiver","receiver_id", "time", "user_id","user_name"],
                    where: { receiver_id: id },
                })
                break
            default:
                return res.status(200).json("Opción invalida, enviar /messages/inbox o /messages/sent")
        }
        return res.status(200).json(result)
    } catch (err) {
        console.log(err)
    }
}

const deleteMessage = async (req, res) => {
    try {
        const {id} = req.body
        const result = await Message.destroy({ restartIdentity: true, where: { id } })
        if(!result){
            throw new Error("Id incorrecta")
        }
        return res.status(200).json(!!result)
    } catch (err) {
        console.log(err)
        return res.status(400).json("algo salio mal")
    }
}

export { createMessage, getMessages, deleteMessage}
