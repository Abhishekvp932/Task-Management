export type TaskStatus = "pending" | "completed";

export interface Task {
  _id: string;
  userId: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface StatusCount {
  _id: TaskStatus;
  count: number;
}

export interface WeeklyData {
  day: number;
  completed: number;
  pending: number;
}

export interface DashboardData {
  tasks: Task[];
  statusCount: StatusCount[];
  weeklyData: WeeklyData[];
}
