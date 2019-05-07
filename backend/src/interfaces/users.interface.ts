import { Document } from "mongoose";

export interface Users extends Document{
    username : string,
    email : string,
    image : string,
    salt : string,
    hash : string
}
