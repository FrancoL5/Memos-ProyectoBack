import express from "express";
import { createUser, deleteUsers, findUsers, sincModel } from "../controllers/memosController.js";
const router = express.Router();


router.post("/api/allUsers",findUsers)
router.post("/api/createUser",createUser)
router.post("/api/deleteUsers", deleteUsers)
router.put("/api/syncModels", sincModel)

export {router}