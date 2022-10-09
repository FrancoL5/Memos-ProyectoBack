import Message from "../models/Message.js"

const createMessage = async (req, res) => {
    try {
        const { id } = req.params

        const messages = JSON.parse(req.body.messages)

        const result = await Promise.all(
            messages.map(async (content) => {
                await Message.create({ ...content, user_id: id })
            })
        )
        return res.status(200).json(`Mensajes enviados:${result.length}`)
    } catch (err) {
        return res.status(400).json(err)
    }
}

const getMessages = async (req, res) => {
    try {
        const { id, flow } = req.params
        let result = []
        switch (flow) {
            case "sent":
                result = await Message.findAll({
                    attributes: ["content", "receiver","receiver_id", "time", "user_id"],
                    where: { user_id: id },
                })
                break
            case "inbox":
                result = await Message.findAll({
                    attributes: ["content", "receiver","receiver_id", "time", "user_id"],
                    where: { receiver: id },
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
