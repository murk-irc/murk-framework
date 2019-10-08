declare module "irc-message" {
    import { Transform } from "stream"

    export interface IRCMessage {
        raw: string;
        tags: {
            [tag: string]: string | boolean
        };
        prefix: string;
        command: string;
        params: string[];
    }
    export function parse(data: string): IRCMessage
    export function createStream(options?: {
        convertTimestamps?: boolean
        parsePrefix?: boolean
    }): Transform
}