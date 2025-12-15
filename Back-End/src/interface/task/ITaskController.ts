import { NextFunction, Request, Response } from "express";

export interface ITaskController {
    createNewTask(req:Request,res:Response,next:NextFunction):Promise<void>;
    findUserTask(req:Request,res:Response,next:NextFunction):Promise<void>;
    updateTask(req:Request,res:Response,next:NextFunction):Promise<void>;
    deleteTask(req:Request,res:Response,next:NextFunction):Promise<void>;
    changeTaskStatus(req:Request,res:Response,next:NextFunction):Promise<void>;
}