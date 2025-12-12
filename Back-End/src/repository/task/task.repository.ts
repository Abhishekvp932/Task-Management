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
}