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
        return response.data;
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

export const editTask = async (taskId:string,title:string)=>{
    try {
        const response = await api.put(API_ROUTES.updateTask(taskId),{
            title,
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const deleteTask = async(taskId:string)=>{
    try {
        const response = await api.delete(API_ROUTES.deleteTask(taskId))
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const changeStatus = async (taskId:string)=>{
    try {
        const response = await api.patch(API_ROUTES.changeTaskStatus(taskId))
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}