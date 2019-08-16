import { model, Document, Model, Schema } from "mongoose";
import { Chat } from "../../models/Chat";

export interface ChatModel extends Chat, Document {
    getMsg(): string;
}

export const ChatSchema: Schema = new Schema({
    streamerName: String,
    "badge-info": {
        subscriber: String,
    },
    badges: {
        subscriber: String,
        bits: String,
    },
    color: String,
    "display-name": String,
    flags: String,
    emotes: String,
    chatId: String,
    mod: Boolean,
    "room-id": String,
    subscriber: Boolean,
    "tmi-sent-ts": String,
    turbo: Boolean,
    "user-id": String,
    "user-type": String,
    "emotes-raw": String,
    "badge-info-raw": String,
    "badges-raw": String,
    username: String,
    "message-type": String,
    message: String,
});


export const ChatModel: Model<ChatModel> = model<ChatModel>("Chat", ChatSchema);