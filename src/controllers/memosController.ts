import { Request, Response } from "express"
import User from "../models/User"

const findUsers = async (_req: Request, res: Response) => {
    const users = await User.findAll()
    return res.status(200).json(users)
}

const createUser = async (req: Request, res: Response) => {
    await User.sync({ alter: true })

    const { username } = req.query
    User.create({ USERNAME: username })
        .then((result) => res.status(200).json(result.toJSON()))
        .catch(console.error)
}
export { findUsers, createUser }
