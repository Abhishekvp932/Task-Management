import api from "@/app/AxiosInstence";
import { API_ROUTES } from "@/constants/ApiRoutes";
interface TaskType {
    title:string;
    status:string
    createdAt?:Date;
    updatedAt?:Date;
}
export const CreateTask = async(userId:string,taskData:TaskType)=>{
    try {
        const response = await api.post(API_ROUTES.createTask(userId),{
            taskData
        })
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const findAllUserTask = async (userId:string)=>{
    try {
        const response = await api.get(API_ROUTES.findAllUserTask(userId));

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}