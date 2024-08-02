import { MessageInterface } from "./message.interface";

export interface DiscussionInteraface {
    disc_id: number;
    disc_name : string;
    created_at : Date;
    updated_at : Date;
    messages? : MessageInterface[];
}