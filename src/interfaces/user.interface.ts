import { MessageInterface } from "./message.interface";

export interface UserInterface {
    user_id: number;
    user_name: string;
    user_password: string;
    created_at: Date;
    updated_at: Date;
    messages?: MessageInterface[];
}