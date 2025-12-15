import { TaskTypes } from "../../types/taskType"

export interface ITaskService {
    createNewTask(userId:string,title:string,status:string):Promise<{msg:string}>
    findUserTask(userId:string):Promise<TaskTypes[]>;
    updateTask(taskId:string,title:string):Promise<{msg:string}>;
    deleteTask(taskId:string):Promise<{msg:string}>;
    changeTaskStatus(taskId:string):Promise<{msg:string}>;
}