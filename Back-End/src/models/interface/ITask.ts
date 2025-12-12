import mongoose from "mongoose";

export interface ITask {
    _id:string;
    userId:mongoose.Types.ObjectId,
    title:string;
    status:'completed' | 'pending' | string;
    createdAt:Date;
    updatedAt:Date;
}