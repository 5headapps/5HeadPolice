import express from "express";
import { ChatController } from "../controllers/chatController";
import { ChatInterface } from "../dataaccess/interfaces/chatInterface";
import { MongoChatDataAccess } from "../dataaccess/mongoChatDataAccess";

export class ChatRoutes {
    private _chatController: ChatController;
    constructor(chatInterface: ChatInterface) {
        this._chatController = new ChatController(chatInterface);
    }

    public getRoutes() {
        let router = express.Router();

        router.get("/api/chats/:id", (req, res) => { return this._chatController.getAllChatByStreamer(req, res); });
        router.put("/api/chat", (req, res) => { return this._chatController.saveChatToDatabase(req, res); });
        return router;
    }
}