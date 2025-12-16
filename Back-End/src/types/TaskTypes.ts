import { Types } from "mongoose";

export type TaskStatus = "completed" | "pending";

export interface ITask {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}