import express from 'express';
import { TaskController } from '../controller/task/task.controller';
import { TaskService } from '../service/task/task.service';
import { TaskRepositroy } from '../repository/task/task.repository';
import { UserRepository } from '../repository/user/user.repository';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();
const taskRepository = new  TaskRepositroy();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository,userRepository);
const taskController = new TaskController(taskService);


router.route('/create/:userId')
.post(authMiddleware,taskController.createNewTask.bind(taskController));

router.route('/task/:userId')
.get(authMiddleware,taskController.findUserTask.bind(taskController));

router.route('/update/:taskId')
.put(authMiddleware,taskController.updateTask.bind(taskController));

router.route('/delete/:taskId')
.delete(authMiddleware,taskController.deleteTask.bind(taskController));

router.route('/change-status/:taskId')
.patch(authMiddleware,taskController.changeTaskStatus.bind(taskController));

router.route('/dashboard/:userId')
.get(authMiddleware,taskController.getDashboard.bind(taskController));
export default router;