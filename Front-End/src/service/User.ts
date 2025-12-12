import api from "@/app/AxiosInstence";
import { API_ROUTES } from "@/constants/ApiRoutes";


export const Signup = async(name:string,email:string,password:string)=>{
    try {
        const response = await api.post(API_ROUTES.sigup,{
            name,
            email,
            password,
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export const Login = async (email:string,password:string)=>{
    try {
        const response = await api.post(API_ROUTES.login,{
            email,
            password,
        })
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
}