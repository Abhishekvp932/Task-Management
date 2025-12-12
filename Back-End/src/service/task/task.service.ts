import { Types } from "mongoose";
import { ITaskRepository } from "../../interface/task/ITaskRepository";
import { ITaskService } from "../../interface/task/ITaskService";
import { IUserRepository } from "../../interface/user/IUserRepository";
import { getIO } from "../../utils/socket/taskSocket";
import { TaskTypes } from "../../types/taskType";

export class TaskService implements ITaskService {
    constructor(private _taskRepository:ITaskRepository,private _userRepository:IUserRepository){}
    async createNewTask(userId: string, title: string, status: string): Promise<{ msg: string; }> {
       
        const user = await this._userRepository.findById(userId);
        if(!user){
            throw new Error('User Not Found');
        }
       
        const newTask = {
            userId:new Types.ObjectId(userId as string),
            title:title,
            status:status,
        };
        
        const task = await this._taskRepository.create(newTask);
        getIO().emit('taskCreated',task);
        
        return {msg :'Task Added'};
    }
    async findUserTask(userId: string): Promise<TaskTypes[]> {
        const user = await this._userRepository.findById(userId);

        if(!user){
            throw new Error('User Not found')
        };
        const userTasks = await this._taskRepository.findByUserId(userId);
        console.log('user tasks',userTasks);
        const tasks : TaskTypes[] = userTasks.map((t)=>{
            return {
                _id:t._id.toString(),
                userId:t.userId.toString(),
                title:t.title,
                status:t.status,
                createdAt:t.createdAt,
                updatedAt:t.updatedAt,
            }
        })
        return tasks;
    }
}