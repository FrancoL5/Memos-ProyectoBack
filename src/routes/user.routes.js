import express from "express";
import { createUser, deleteUsers, findUsers, getID, sincModel } from "../controllers/memosController.js";
const routerUser = express.Router();


routerUser.get("/api/:userName",findUsers)
routerUser.get("/api/usersID/:userName",getID)
routerUser.post("/api/createUser",createUser)
routerUser.post("/api/deleteUsers", deleteUsers)
routerUser.put("/api/syncModels", sincModel)

export {routerUser}