import { ChatCallback, ChatInterface } from "../dataaccess/interfaces/chatInterface";
import { ChatModel } from "../dataaccess/schemas/ChatSchema";
import { Chat } from "../models/Chat";
import { BaseController } from "./baseController";

export class ChatController extends BaseController {
    private _chatDA: ChatInterface;

    constructor(chatInterface: ChatInterface) {
        super();
        this._chatDA = chatInterface;
    }

    saveChatToDatabase(req, res) {

        let chatData = new ChatModel();
        chatData.streamerName = req.streamerName;


        this._chatDA.saveChatToDatabase(chatData, (err: string, saved: boolean) => {
            if (err) {
                this.send500(res, err);
            } else {
                res.send(saved);
            }
        });
    }


    getAllChatByStreamer(req, res) {
        this._chatDA.getAllChatByStreamer(req.params.id, (err: string, chats: Chat[]) => {
            if (err) {
                this.send500(res, err);
            } else {
                res.send(chats);
            }
        });
    }
}