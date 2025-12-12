import { TaskTypes } from "../../types/taskType"

export interface ITaskService {
    createNewTask(userId:string,title:string,status:string):Promise<{msg:string}>
    findUserTask(userId:string):Promise<TaskTypes[]>
}