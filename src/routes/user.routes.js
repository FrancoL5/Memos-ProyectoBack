import express from "express";
import { createUser, deleteUsers, findUsers, sincModel } from "../controllers/memosController.js";
const routerUser = express.Router();


routerUser.post("/api/allUsers",findUsers)
routerUser.post("/api/createUser",createUser)
routerUser.post("/api/deleteUsers", deleteUsers)
routerUser.put("/api/syncModels", sincModel)

export {routerUser}