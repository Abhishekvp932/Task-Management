import { Types } from "mongoose";
import { ITaskRepository } from "../../interface/task/ITaskRepository";
import { ITaskService } from "../../interface/task/ITaskService";
import { IUserRepository } from "../../interface/user/IUserRepository";
import { getIO } from "../../utils/socket/taskSocket";
import { TaskTypes } from "../../types/taskType";

export class TaskService implements ITaskService {
  constructor(
    private _taskRepository: ITaskRepository,
    private _userRepository: IUserRepository
  ) {}
  async createNewTask(
    userId: string,
    title: string,
    status: string
  ): Promise<{ msg: string }> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new Error("User Not Found");
    }

    const newTask = {
      userId: new Types.ObjectId(userId as string),
      title: title,
      status: status,
    };

    const task = await this._taskRepository.create(newTask);
    getIO().emit("taskCreated", task);

    return { msg: "Task Added" };
  }
  async findUserTask(userId: string): Promise<TaskTypes[]> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new Error("User Not found");
    }
    const userTasks = await this._taskRepository.findByUserId(userId);
    console.log("user tasks", userTasks);
    const tasks: TaskTypes[] = userTasks.map((t) => {
      return {
        _id: t._id.toString(),
        userId: t.userId.toString(),
        title: t.title,
        status: t.status,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      };
    });
    return tasks;
  }
  async updateTask(taskId: string, title: string): Promise<{ msg: string }> {
    const task = await this._taskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task Not Found");
    }
    const editTask = {
      title: title,
    };
    const updatedTask = await this._taskRepository.findByIdAndUpdate(
      taskId,
      editTask
    );
    getIO().emit("taskUpdated", updatedTask);
    return { msg: "Your Task Updated" };
  }
  async deleteTask(taskId: string): Promise<{ msg: string }> {
    const task = await this._taskRepository.findById(taskId);
    if (!task) {
      throw new Error("Task not Found");
    }
    const deletedTask = await this._taskRepository.findByIdAndDelete(taskId);

    getIO().emit("taskDeleted", {
      taskId: deletedTask?._id.toString(),
      userId: deletedTask?.userId.toString(),
    });
    return { msg: "Task Deleted" };
  }

  async changeTaskStatus(taskId: string): Promise<{ msg: string }> {
    const task = await this._taskRepository.findById(taskId);
    if (!task) {
      throw new Error("Task Not Found");
    }
    const newTask = {
      status: "completed",
    };
    const updatedTask = await this._taskRepository.findByIdAndUpdate(
      taskId,
      newTask
    );

    if (!updatedTask) {
      throw new Error("task not found");
    }

    getIO().emit("updateStatus", {
      _id: updatedTask._id.toString(),
      title: updatedTask.title,
      status: updatedTask.status,
      userId: updatedTask.userId.toString(),
    });
    return { msg: "status changed" };
  }
}
