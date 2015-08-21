/// <reference path="../../typings/tsd.d.ts" />
declare module 'typedgram-bot' {
    import TelegramBot = require("node-telegram-bot-api");
    import { Stream } from "stream";
    import Promise = require("bluebird");
    export interface IServerOptions {
        host: string;
        port: number;
        domain: string;
    }
    export const TelegramEvent: {
        sticker: string;
        photo: string;
        audio: string;
        video: string;
        document: string;
        contact: string;
        location: string;
        new_chat_participant: string;
        left_chat_participant: string;
        new_chat_title: string;
        new_chat_photo: string;
        delete_chat_photo: string;
        group_chat_created: string;
    };
    export type Action = (msg: Message) => Promise<Message>;
    export type idType = number | string;
    export type fileType = string | Stream;
    export class TelegramTypedBot extends TelegramBot {
        commands: {
            [command: string]: Action;
        };
        events: {
            [command: string]: Action;
        };
        protected waitingResponse: {
            [ticket: string]: (msg: Message) => void;
        };
        initializationAction: (me: User) => void;
        missingAction: Action;
        plainTextAction: Action;
        constructor(token: string, server: IServerOptions);
        protected _request(path: string, qsopt?: IQs): Promise<Message>;
        waitResponse(msg: Message, timeout?: number): (msg: Message) => Promise<Message>;
        protected getTicketFromInfo(chatId: idType, fromId: idType): string;
        protected getTicketFromMessage(msg: Message): string;
        protected addToWaiting(ticket: string, resolve: (msg: Message) => void): void;
        protected removeFromWaiting(ticket: string): void;
        protected receivedMessage(event: string, msg: Message): void;
        protected receivedResponseMessage(msg: Message, ticket: string, pendingResolve: (msg: Message) => void): void;
        protected receivedNonResponseMessage(event: string, msg: Message): void;
        protected receivedText(msg: Message): void;
        protected receivedCommand(command: string, arg: string, msg: Message): void;
        protected receivedPlainText(text: string, msg: Message): void;
        onCommand(commands: string | string[], action: Action): void;
        execCommand(command: string, msg: Message): Promise<Message>;
        onEvent(events: string | string[], action: Action): void;
        execEvent(event: string, msg: Message): Promise<Message>;
        onPlainText(action: Action): void;
        onMissingCommand(action: Action): void;
        onInitialization(action: (me: User) => void): void;
    }
}
