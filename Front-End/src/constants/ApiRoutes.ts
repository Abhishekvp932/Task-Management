export const API_ROUTES = {
    sigup:'/api/user/signup',
    login:'/api/user/login',
    createTask:(userId:string)=> `/api/task/create/${userId}`,
    findAllUserTask:(userId:string)=>`/api/task/task/${userId}`,
    updateTask:(taskId:string)=>`/api/task/update/${taskId}`,
    deleteTask:(taskId:string)=>`/api/task/delete/${taskId}`,
    changeTaskStatus:(taskId:string)=>`/api/task/change-status/${taskId}`,
    getUserDashboard:(userId:string)=>`/api/task/dashboard/${userId}`,
}