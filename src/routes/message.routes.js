import express from "express";
import { createMessage, getMessages } from "../controllers/messagesController.js";
const routerMessage = express.Router();


routerMessage.post("/:id/messages", createMessage)
routerMessage.get("/:id/messages/:flow", getMessages)

export default routerMessage