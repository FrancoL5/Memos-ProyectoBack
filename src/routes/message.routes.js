import express from "express";
import { createMessage, deleteMessage, getMessages } from "../controllers/messagesController.js";
const routerMessage = express.Router();


routerMessage.post("/messages", createMessage)
routerMessage.post("/messages/delete", deleteMessage)
routerMessage.get("/:id/messages/:flow", getMessages)

export default routerMessage