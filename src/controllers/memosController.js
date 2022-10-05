import User from "../models/User.js"
import Message from "../models/Message.js"

const sincModel = async (req, res) => {
    const { model } = req.body

    switch (model) {
        case "Message":
            Message.sync({ alter: true })
                .then(() => {
                    return res.status(200).json("Sincronizado")
                })
                .catch(console.error)
            break
        case "User":
            User.sync({ alter: true }).then(() => {
                return res.status(200).json("Sincronizado")
            }).catch(console.error)
            break;
        default:
            return res.status(400).json("Model not found")
    }
}
const findUsers = async (req, res) => {
    try {
        let result = []
        const ids = req.body.ids ? JSON.parse(req.body.ids) : null
        if (ids) {
            ;[result] = await Promise.all(
                ids.map(async (id) => await User.findAll({ where: { id } }))
            )
        } else {
            result = await User.findAll()
        }
        console.log(result)
        return res.status(200).json(result)
    } catch (err) {
        console.log(err)
    }
}

const createUser = async (req, res) => {
    const { name, last_name, country, city, password, user_name } = req.body
    User.create({
        user_name,
        name,
        last_name,
        country,
        city,
        password,
    })
        .then((result) => res.status(200).json(result.toJSON()))
        .catch(console.error)
}
const deleteUsers = async (req, res) => {
    try {
        const ids = JSON.parse(req.body.ids)
        const result = await Promise.all(
            ids.map(
                async (id) =>
                    await User.destroy({ restartIdentity: true, where: { id } })
            )
        )
        return res.status(200).json(result.reduce((acc, num) => acc + num, 0))
    } catch (err) {
        console.log(err)
        return res.status(400).json("algo salio mal")
    }
}
export { findUsers, createUser, deleteUsers, sincModel }
