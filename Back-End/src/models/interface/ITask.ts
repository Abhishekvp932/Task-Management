import mongoose from "mongoose";

export interface ITask {
    userId:mongoose.Types.ObjectId,
    title:string;
    status:'completed' | 'pending';
    createdAt:Date;
    updatedAt:Date;
}