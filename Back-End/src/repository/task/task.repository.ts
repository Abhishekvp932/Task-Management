import { UpdateQuery } from "mongoose";
import { ITaskRepository } from "../../interface/task/ITaskRepository";
import Task from "../../models/implementation/task.model";
import { ITask } from "../../models/interface/ITask";

export class TaskRepositroy implements ITaskRepository {
    constructor(){}

    async create(taskData: Partial<ITask>): Promise<ITask | null> {
        return await Task.create(taskData);
    }

    async findByUserId(userId: string): Promise<ITask[]> {
        return await Task.find({userId});
    }
    async findById(taskId: string): Promise<ITask | null> {
       return await Task.findById(taskId);
    }
    async findByIdAndUpdate(taskId: string, data: UpdateQuery<ITask>): Promise<ITask | null> {
        return await Task.findByIdAndUpdate(taskId,data,{new:true});
    }
    async findByIdAndDelete(taskId: string): Promise<ITask | null> {
        return await Task.findByIdAndDelete(taskId);
    }
}