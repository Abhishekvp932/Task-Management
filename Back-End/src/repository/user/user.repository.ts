import { IUserRepository } from "../../interface/user/IUserRepository";
import User from "../../models/implementation/user.model";
import { IUser } from "../../models/interface/IUser";





export class UserRepository implements IUserRepository{
    constructor(){}
    async create(userDate: Partial<IUser>): Promise<IUser | null> {
        return await User.create(userDate);
    }
    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({email});
    }
    async findById(userId: string): Promise<IUser | null> {
        return await User.findById(userId);
    }
}