import { NextFunction, Request, Response } from "express";

export interface IUserController {
    signup(req:Request,res:Response,next:NextFunction):Promise<void>;
    login(req:Request,res:Response,next:NextFunction):Promise<void>;
}