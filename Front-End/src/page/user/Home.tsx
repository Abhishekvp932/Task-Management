"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Plus,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Circle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  changeStatus,
  CreateTask,
  deleteTask,
  editTask,
  getUserDashboard,
} from "@/service/Task";
import { toast, ToastContainer } from "react-toastify";
import { handleApiError } from "@/utils/HandleApiError";
import { socket } from "@/utils/socket";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/userSlice";

type TaskStatus = "pending" | "completed";

interface Task {
  _id: string;
  userId: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

interface StatusCount {
  _id: TaskStatus;
  count: number;
}

interface WeeklyData {
  day: number;
  completed: number;
  pending: number;
}

interface DashboardData {
  tasks: Task[];
  statusCount: StatusCount[];
  weeklyData: WeeklyData[];
}

export default function Home() {
  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?._id as string;

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const tasksPerPage = 5;
   const navigate = useNavigate();

useEffect(()=>{
  if(!user){
    navigate('/');
  }
},[user]);

useEffect(() => {
  if (!userId) return;

  let isMounted = true;

  const loadDashboard = async () => {
    try {
      const res = await getUserDashboard(userId);
      if (isMounted) {
        setDashboard(res.data);
      }
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  loadDashboard();

  socket.on("taskCreated", loadDashboard);
  socket.on("taskUpdated", loadDashboard);
  socket.on("taskDeleted", loadDashboard);
  socket.on("updateStatus", loadDashboard);

  return () => {
    isMounted = false;
    socket.off("taskCreated", loadDashboard);
    socket.off("taskUpdated", loadDashboard);
    socket.off("taskDeleted", loadDashboard);
    socket.off("updateStatus", loadDashboard);
  };
}, [userId]);


  const addTask = async () => {
    try {
      if (!newTaskTitle.trim()) return;
      await CreateTask(userId, { title: newTaskTitle, status: "pending" });
      setNewTaskTitle("");
      setCurrentPage(1);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const completeTask = async (id: string) => {
    try {
      const res = await changeStatus(id);
      toast.success(res.msg);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const updateTask = async (id: string, title: string) => {
    try {
      const res = await editTask(id, title);
      setEditingId(null);
      setEditingTitle("");
      toast.success(res.msg);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const taskDelete = async (id: string) => {
    try {
      const res = await deleteTask(id);
      toast.success(res.msg);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const tasks = dashboard?.tasks ?? [];

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const analyticsData =
    dashboard?.statusCount.map((s) => ({
      name: s._id === "completed" ? "Completed" : "Pending",
      value: s.count,
      fill: s._id === "completed" ? "#10b981" : "#f59e0b",
    })) ?? [];

  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklyChartData =
    dashboard?.weeklyData.map((w) => ({
      day: dayMap[w.day],
      completed: w.completed,
      pending: w.pending,
    })) ?? [];


    const dispatch = useDispatch();
    const handleLogout = ()=>{
       dispatch(logout())
       navigate('/');
    }

  return (
    <div className="min-h-screen bg-white px-4 pt-24 max-w-5xl mx-auto">
      <div className="absolute top-4 right-4">
        <Button variant="outline" className="flex items-center gap-2" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <Button onClick={addTask}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      <div className="space-y-2">
        {currentTasks.map((task) => (
          <div
            key={task._id}
            className="flex items-center gap-3 p-4 border rounded-lg"
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="text-green-500" />
            ) : (
              <Circle className="text-gray-400" />
            )}

            {editingId === task._id ? (
              <div className="flex-1 flex gap-2">
                <input
                  autoFocus
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 border px-2 py-1"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateTask(task._id, editingTitle)}
                >
                  Save
                </Button>
              </div>
            ) : (
              <span
                className={`flex-1 text-center ${
                  task.status === "completed"
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {task.title}
              </span>
            )}

            <div className="flex gap-2">
              {task.status === "pending" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => completeTask(task._id)}
                >
                  Complete
                </Button>
              )}

              {task.status === "pending" && (
                <button
                  onClick={() => {
                    setEditingId(task._id);
                    setEditingTitle(task.title);
                  }}
                >
                  <Edit2 className="text-blue-600" />
                </button>
              )}

              <button onClick={() => taskDelete(task._id)}>
                <Trash2 className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={analyticsData} dataKey="value" outerRadius={90}>
              {analyticsData.map((e, i) => (
                <Cell key={i} fill={e.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#10b981" />
            <Bar dataKey="pending" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ToastContainer autoClose={200} />
    </div>
  );
}