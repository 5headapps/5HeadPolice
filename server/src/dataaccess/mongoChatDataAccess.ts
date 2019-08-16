
import { ChatCallback, ChatInterface, SaveCallback } from "./interfaces/chatInterface";
import { ChatModel } from "./schemas/ChatSchema";



export class MongoChatDataAccess implements ChatInterface {

    public saveChatToDatabase(chatData: ChatModel, saveCallback: SaveCallback) {
        chatData.save((err, chat) => {
            if (err)
                return saveCallback(String(err), false);
            return saveCallback(undefined, true);
        });
    }
    public getAllChatByStreamer(req, chatCallback: ChatCallback) {
        ChatModel
            .find({ published: true })
            .sort({ createdAt: -1 })
            .limit(req.body.limit ? req.body.limit : 500)
            .exec((err, chats) => {
                if (err)
                    return chatCallback(String(err));
                return chatCallback(undefined, chats);
            });
    }
}