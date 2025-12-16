import mongoose, { UpdateQuery } from "mongoose";
import { ITaskRepository } from "../../interface/task/ITaskRepository";
import Task from "../../models/implementation/task.model";
import { ITask } from "../../models/interface/ITask";
import { ITaskDashboardAggregation } from "../../types/dashboardTypes";

export class TaskRepositroy implements ITaskRepository {
    constructor(){}

    async create(taskData: Partial<ITask>): Promise<ITask | null> {
        return await Task.create(taskData);
    }

    async findByUserId(userId: string): Promise<ITask[]> {
        return await Task.find({userId});
    }
    async findById(taskId: string): Promise<ITask | null> {
       return await Task.findById(taskId);
    }
    async findByIdAndUpdate(taskId: string, data: UpdateQuery<ITask>): Promise<ITask | null> {
        return await Task.findByIdAndUpdate(taskId,data,{new:true});
    }
    async findByIdAndDelete(taskId: string): Promise<ITask | null> {
        return await Task.findByIdAndDelete(taskId);
    }

   async findDashboardData(
  userId: string
): Promise<ITaskDashboardAggregation> {
  const result = await Task.aggregate<ITaskDashboardAggregation>([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $facet: {
        tasks: [
          { $sort: { createdAt: -1 } },
        ],

        statusCount: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ],

        weeklyData: [
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
              createdAt: {
                $gte: new Date(
                  new Date().setDate(new Date().getDate() - 7)
                ),
              },
            },
          },
          {
            $group: {
              _id: {
                day: { $dayOfWeek: "$createdAt" },
                status: "$status",
              },
              count: { $sum: 1 },
            },
          },
          {
            $group: {
              _id: "$_id.day",
              completed: {
                $sum: {
                  $cond: [
                    { $eq: ["$_id.status", "completed"] },
                    "$count",
                    0,
                  ],
                },
              },
              pending: {
                $sum: {
                  $cond: [
                    { $eq: ["$_id.status", "pending"] },
                    "$count",
                    0,
                  ],
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              day: "$_id",
              completed: 1,
              pending: 1,
            },
          },
          { $sort: { day: 1 } },
        ],
      },
    },
  ]);
  
  return (
    result[0] ?? {
      tasks: [],
      statusCount: [],
      weeklyData: [],
    }
  );
}
}