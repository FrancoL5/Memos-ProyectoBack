import Message from "../models/Message.js"
import User from "../models/User.js"

const createMessage = async (req, res) => {
    try {
        const messages = req.body

        console.log(messages);
        await Promise.all(
            messages.map(async (content) => {
                const receiver_id = (await User.findOne({attributes:["user_id"], where: {user_name: content.receiver}})).user_id
                console.log(content);
                if(!receiver_id){
                    throw new Error("Uno de los usuarios no existe")
                }
                return await Message.create({ ...content,receiver_id })
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

export { createMessage, getMessages }
