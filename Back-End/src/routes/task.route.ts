import express from 'express';
import { TaskController } from '../controller/task/task.controller';
import { TaskService } from '../service/task/task.service';
import { TaskRepositroy } from '../repository/task/task.repository';
import { UserRepository } from '../repository/user/user.repository';

const router = express.Router();
const taskRepository = new  TaskRepositroy();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository,userRepository);
const taskController = new TaskController(taskService);


router.route('/create/:userId')
.post(taskController.createNewTask.bind(taskController));

router.route('/task/:userId')
.get(taskController.findUserTask.bind(taskController));

export default router;