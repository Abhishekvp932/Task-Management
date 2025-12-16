import { TaskTypes } from "./taskType";

export interface IStatusCount {
  _id: "pending" | "completed";
  count: number;
}

export interface IWeeklyData {
  day: number; 
  completed: number;
  pending: number;
}

export interface ITaskDashboardAggregation {
  tasks: TaskTypes  [];
  statusCount: IStatusCount[];
  weeklyData: IWeeklyData[];
}
