export interface Chat {
    streamerName: string;
    "badge-info": {
        subscriber: string,
    };
    badges: {
        subscriber: string,
        bits: string,
    };
    color: string;
    "display-name": string;
    flags: string;
    emotes: string;
    chatId: string;
    mod: boolean;
    "room-id": string;
    subscriber: boolean;
    "tmi-sent-ts": string;
    turbo: boolean;
    "user-id": string;
    "user-type": string;
    "emotes-raw": string;
    "badge-info-raw": string;
    "badges-raw": string;
    username: string;
    "message-type": string;
    message: string;
}