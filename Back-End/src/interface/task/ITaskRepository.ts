import { ITask } from "../../models/interface/ITask";

export interface ITaskRepository{
    create(taskData:Partial<ITask>):Promise<ITask | null>;
    findByUserId(userId:string):Promise<ITask[]>;
}