import { userType } from "../../types/userType"

export interface IUserService {
    signup(name:string,email:string,password:string):Promise<{msg:string}>
    login(email:string,password:string):Promise<{accessToken:string,refreshToken:string,user:userType}>
}