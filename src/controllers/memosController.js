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
            User.sync({ alter: true })
                .then(() => {
                    return res.status(200).json("Sincronizado")
                })
                .catch(console.error)
            break
        default:
            return res.status(400).json("Model not found")
    }
}

const findUsers = async (req, res) => {
    try {
        let result = []
        const { userName } = req.params
        console.log(userName);
        if (userName !== "ALL") {
            result = await User.findAll({ where: { user_name: userName } })
        } else if (userName === "ALL") {
            result = await User.findAll()
        }
        return res.status(200).json(result)
    } catch (err) {
        console.log(err)
    }
}

const getID = async (req, res) => {
    try {
        const { userName } = req.params
        const {dataValues: result} = await User.findOne({
            attributes: ["user_id"],
            where: { user_name: userName },
        })
        console.log(result)

        return res.status(200).json(result.user_id)
    } catch (err) {
        console.log(err)
        return res.status(400).json(null)
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
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err))
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
export { findUsers, createUser, deleteUsers, sincModel, getID }
