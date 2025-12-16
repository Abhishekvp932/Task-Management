import { Request, Response, NextFunction } from "express";
import { ITaskController } from "../../interface/task/ITaskController";
import { ITaskService } from "../../interface/task/ITaskService";
import { HttpStatus } from "../../utils/httpsStatus";

export class TaskController implements ITaskController {
  constructor(private _taskService: ITaskService) {}

  async createNewTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.userId;
      const { title, status } = req.body.taskData;

      const result = await this._taskService.createNewTask(
        userId,
        title,
        status
      );
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }
  async findUserTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await this._taskService.findUserTask(userId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
  async updateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { taskId } = req.params;
      const { title } = req.body;
      console.log("update task request is comming....", taskId);
      const result = await this._taskService.updateTask(taskId, title);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { taskId } = req.params;
      const result = await this._taskService.deleteTask(taskId);
      res.status(HttpStatus.OK).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }
  async changeTaskStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { taskId } = req.params;
      const result = await this._taskService.changeTaskStatus(taskId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getDashboard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      console.log("get dashboard request is comming ...",userId);

      const result = await this._taskService.getDashbaord(userId);

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
