import { ITask } from "../interface/ITask";
import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema<ITask>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['completed','pending'],
        default:'pending',
    },

},{timestamps:true});


const Task = mongoose.model<ITask>('Task',taskSchema);


export default Task;