import { Request, Response, NextFunction } from "express";
import { ITaskController } from "../../interface/task/ITaskController";
import { ITaskService } from "../../interface/task/ITaskService";
import { HttpStatus } from "../../utils/httpsStatus";

export class TaskController implements ITaskController{
    constructor(private _taskService:ITaskService){}

    async createNewTask(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.userId;
            const { title, status } = req.body.taskData;
            
            const result = await this._taskService.createNewTask(userId,title,status);
            res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
            next(error);
        }
    }
    async findUserTask(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {userId} = req.params;
            const result = await this._taskService.findUserTask(userId);
            res.status(HttpStatus.OK).json(result);
        } catch (error) {
            next(error)
        }
    }
}