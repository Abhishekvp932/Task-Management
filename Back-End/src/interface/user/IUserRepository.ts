import { IUser } from "../../models/interface/IUser";

export interface IUserRepository {
  create(userDate:Partial<IUser>):Promise<IUser | null>;
  findByEmail(email:string):Promise<IUser | null>;
  findById(userId:string):Promise<IUser | null>;
}