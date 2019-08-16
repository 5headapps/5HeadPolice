import { Chat } from "../../models/Chat";
import { ChatModel } from "../schemas/ChatSchema";


export interface SaveCallback { (err?: string, saved?: boolean); }
export interface ChatCallback { (err?: string, chat?: Chat[]); }

export interface ChatInterface {
    saveChatToDatabase(chatData: ChatModel, saveCallback: SaveCallback);
    getAllChatByStreamer(streamerName: string, chatCallback: ChatCallback);
}