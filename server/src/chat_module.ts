

import { client, Options } from "tmi.js";
import { config } from "./5HeadConfigs/config";
import { ChatController } from "./controllers/chatController";
import { ChatModel, ChatSchema } from "./dataaccess/schemas/ChatSchema";

export class ChatModule {

    constructor() {
    }
    // Define configuration options
    opts: Options = {
        identity: {
            username: "5HeadPolice",
            password: config.tmijs_oauth,
        },
        channels: [
            "xqcow",
            "shroud",
            "tfue",
            "myth",
            "mythcody",
            "plebcody",
            "codyreese",
            "dakotaz",
            "riotgames",
            "timthetatman",
            "summit1g",
            "tsm_daequan",
            "drdisrespect",
            "drlupo",
            "pokimane",
            "esl_csgo",
            "nickmercs",
            "syndicate",
            "imaqtpie",
            "loltyler1",
            "sodapoppin",
            "sypherpk",
            "nightblue3",
            "lirik",
            "fortnite",
            "alanzoka",
            "electronicdesire",
            "tsm_hamlinz",
            "couragejd",
            "lolitofdez",
            "faker",
            "rubius",
            "elrubiuslive",
            "castro_1021",
            "cdnthe3rd",
            "montanablack88",
        ],
    };


    public getTwitchChat() {


        const chatClient = client(this.opts);

        chatClient.on("join", this.onJoinHandler);
        chatClient.on("message", this.onMessageHandler);
        chatClient.on("connected", this.onConnectedHandler);

        chatClient.connect();
    }

    private onJoinHandler(target, context) {
        // console.log(context);
    }

    private onMessageHandler(target, context, msg, self) {
        if (self) { return; } // Ignore messages from the bot
        // console.log(target);
        // console.log(msg);
        // Remove whitespace from chat message
        // const commandName = msg.trim();
        context.emotes = null;
        let chatData = new ChatModel(context);
        chatData.streamerName = target;
        chatData.message = msg;
        chatData.save((err, chat) => {
            if (err)
                console.log(err);
            console.log("message saved");
        });

    }

    // Called every time the bot connects to Twitch chat
    private onConnectedHandler(addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
    }

}