import express from "express";
import { routerUser } from "./user.routes.js";
import validateUser from "../controllers/validateUser.js";
import routerMessage from "./message.routes.js";
const router = express.Router();


router.use("/api/users", routerMessage)
router.post("/api/users/:id", validateUser)
router.use(routerUser)


export {router}