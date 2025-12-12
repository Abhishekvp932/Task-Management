export const API_ROUTES = {
    sigup:'/api/user/signup',
    login:'/api/user/login',
    createTask:(userId:string)=> `/api/task/create/${userId}`,
    findAllUserTask:(userId:string)=>`/api/task/task/${userId}`,
}