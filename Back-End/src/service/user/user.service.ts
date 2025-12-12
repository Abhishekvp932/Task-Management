import { IUserRepository } from "../../interface/user/IUserRepository";
import { IUserService } from "../../interface/user/IUserService";
import { userType } from "../../types/userType";
import { generateAccessToken, generateRefreshToken, TokenPayload } from "../../utils/token";

export class UserService implements IUserService{
    constructor(private _userRepository:IUserRepository){}
    async signup(name: string, email: string, password: string): Promise<{ msg: string; }> {
        const userExists = await this._userRepository.findByEmail(email);

        if(userExists){
            throw new Error('User Already Exists');
        }
        const newUser = {
            name,
            email,
            password,
        }
        await this._userRepository.create(newUser);
        return {msg:'Account Created'};
    }
    async login(email: string, password: string): Promise<{accessToken:string,refreshToken:string,user:userType}> {
        const user = await this._userRepository.findByEmail(email);
        if(!user){
            throw new Error('User Not Found')
        }
        if(user.password !== password){
            throw new Error('Incorrect Password');
        }
        const payload : TokenPayload = {
            _id:user._id.toString(),
            email:user.email,
            name:user.name,
        }

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        return {accessToken:accessToken,refreshToken:refreshToken,user:payload}
    }
}