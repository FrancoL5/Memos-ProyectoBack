import express from "express";
import { createUser, findUsers } from "../controllers/memosController";
const router = express.Router();


router.post("/api/allUsers",findUsers)
router.post("/api/createUser",createUser)

export {router}