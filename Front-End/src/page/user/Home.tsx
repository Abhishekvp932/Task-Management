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
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { changeStatus, CreateTask, deleteTask, editTask, findAllUserTask } from "@/service/Task";
import { toast, ToastContainer } from "react-toastify";
import { handleApiError } from "@/utils/HandleApiError";
import { socket } from "@/utils/socket";

interface Task {
  _id: string;
  title: string;
  status: "pending" | "completed" | string;
  userId: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?._id as string;

  const fetchUserTask = async () => {
    try {
      const res = await findAllUserTask(userId);
      setTasks(res.data);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  useEffect(() => {
    if (userId) fetchUserTask();
  }, [userId]);

  const addTask = async () => {
    try {
      if (!newTaskTitle.trim()) return;

      await CreateTask(userId, {
        title: newTaskTitle,
        status: "pending",
      });

      setNewTaskTitle("");
      setCurrentPage(1);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const completeTask = async(id: string) => {
    try {
      const result = await changeStatus(id);
      toast.success(result?.msg);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const updateTask = async (id: string, title: string) => {
    try {
      console.log('edit id and title',id,title);
      const result = await editTask(id, title);
      setEditingId(null);
      setEditingTitle("");
      toast.success(result.msg);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const taskDelete = async(id: string) => {
    try {
      const result = await deleteTask(id);
      toast.success(result.msg);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  useEffect(() => {
    socket.on("taskCreated", (task: Task) => {
      if (task.userId === userId) {
        setTasks((prev) => [...prev, task]);
      }
    });

    socket.on('taskUpdated',(updatedTask:Task)=>{
         setTasks((prev) =>
        prev.map((t) =>
        t._id === updatedTask._id ? updatedTask : t
      )
    );
    });

    socket.on('taskDeleted',({taskId})=>{
       setTasks((prev)=> prev.filter((t)=> t._id !== taskId));
    });

  socket.on("updateStatus", (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === updatedTask._id ? updatedTask : t
      )
    );
  });

    return () => {
      socket.off("taskCreated");
      socket.off('taskUpdated');
      socket.off('taskDeleted');
      socket.off('updateStatus');
    };
  }, [userId]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  const analyticsData = [
    { name: "Completed", value: completedTasks, fill: "#10b981" },
    { name: "Pending", value: pendingTasks, fill: "#f59e0b" },
  ];

  const weeklyData = [
    { day: "Mon", completed: completedTasks, pending: pendingTasks },
    { day: "Tue", completed: completedTasks, pending: pendingTasks },
    { day: "Wed", completed: completedTasks, pending: pendingTasks },
    { day: "Thu", completed: completedTasks, pending: pendingTasks },
    { day: "Fri", completed: completedTasks, pending: pendingTasks },
    { day: "Sat", completed: completedTasks, pending: pendingTasks },
    { day: "Sun", completed: completedTasks, pending: pendingTasks },
  ];

  return (
    <div className="min-h-screen bg-white px-4 pt-24 max-w-5xl mx-auto">
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
              <div className="flex-1 flex items-center gap-2">
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
          <BarChart data={weeklyData}>
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
      <ToastContainer autoClose = {200}/>
    </div>
  );
}
