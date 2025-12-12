import { IUser } from "../interface/IUser";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

const User = mongoose.model<IUser>('User',userSchema);

export default User;