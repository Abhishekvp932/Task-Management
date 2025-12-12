import express from 'express';
import { UserController } from '../controller/user/user.controller';
import { UserService } from '../service/user/user.service';
import { UserRepository } from '../repository/user/user.repository';

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
router.route('/signup')
.post(userController.signup.bind(userController));

router.route('/login')
.post(userController.login.bind(userController));

export default router;