import { UpdateQuery } from "mongoose";
import { ITask } from "../../models/interface/ITask";
import { ITaskDashboardAggregation } from "../../types/dashboardTypes";

export interface ITaskRepository{
    create(taskData:Partial<ITask>):Promise<ITask | null>;
    findByUserId(userId:string):Promise<ITask[]>;
    findById(taskId:string):Promise<ITask | null>;
    findByIdAndUpdate(taskId:string,data:UpdateQuery<ITask>):Promise<ITask | null>;
    findByIdAndDelete(taskId:string):Promise<ITask | null>;
    findDashboardData(userId:string):Promise<ITaskDashboardAggregation>
}