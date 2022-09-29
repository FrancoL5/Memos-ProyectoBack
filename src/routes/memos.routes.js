import express from "express";
import { createUser, deleteUsers, findUsers } from "../controllers/memosController.js";
const router = express.Router();


router.post("/api/allUsers",findUsers)
router.post("/api/createUser",createUser)
router.post("/api/deleteUsers", deleteUsers)

export {router}