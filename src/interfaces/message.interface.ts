import { DiscussionInteraface } from "./discussion.interface";
import { UserInterface } from "./user.interface";

export interface MessageInterface {
    msg_id : number;
    disc_id : number;
    user_id : number;
    msg_content : string;
    created_at : Date;
    updated_at : Date;
    discussion? : DiscussionInteraface;
    user? : UserInterface
}