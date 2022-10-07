import express from "express";
import validateUser from "../controllers/validateUser.js";
import { routerUser } from "./user.routes.js";
const router = express.Router();

router.use(routerUser)

router.post("/api/users/:id", validateUser)


export {router}