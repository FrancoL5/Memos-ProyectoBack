import User from "../models/User.js"
const sincModel = async (req, res) => {
    User.sync({ alter: true }).then(() => {
        return res.status(200).toJSON("Sincronizad")
    }).catch(console.error)

}
const findUsers = async (req, res) => {
    try {
        let result = []
        const ids = req.query.ids ? JSON.parse(req.query.ids) : null
        if (ids) {
            [result] = await Promise.all(
                ids.map(async (id) => 
                    await User.findAll({ where: { id } })
                )
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

    const { name, lastName, country, city, password, userName } = req.query
    User.create({
        user_name: userName,
        name,
        last_name: lastName,
        country,
        city,
        password,
    })
        .then((result) => res.status(200).json(result.toJSON()))
        .catch(console.error)
}
const deleteUsers = async (req, res) => {

    try {
        const ids = JSON.parse(req.query.ids)
        const result = await Promise.all(
            ids.map(async (id) => 
                await User.destroy({ restartIdentity: true, where: { id } })
            )
        )
        return res.status(200).json(result.reduce((acc, num) => acc+num, 0))
    } catch (err) {
        console.log(err)
        return res.status(400).json("algo salio mal")
    }
}
export { findUsers, createUser, deleteUsers, sincModel }
