"use client"

import { useState } from "react"
import { CheckCircle2, Zap, Menu, X, Plus, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
} from "recharts"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [tasks, setTasks] = useState([
    { id: 1, title: "Design new dashboard", status: "completed", priority: "high", dueDate: "2025-01-15" },
    { id: 2, title: "Review team proposals", status: "completed", priority: "medium", dueDate: "2025-01-10" },
    { id: 3, title: "Update documentation", status: "pending", priority: "medium", dueDate: "2025-01-20" },
    { id: 4, title: "Fix bug in authentication", status: "in-progress", priority: "high", dueDate: "2025-01-12" },
    { id: 5, title: "Plan Q2 roadmap", status: "pending", priority: "low", dueDate: "2025-02-01" },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState("")
    

  const user = useSelector((state:RootState)=> state.user);
  console.log('redux user',user);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([ 
        ...tasks,
        {
          id: Math.max(...tasks.map((t) => t.id), 0) + 1,
          title: newTaskTitle,
          status: "pending",
          priority: "medium",
          dueDate: new Date().toISOString().split("T")[0],
        },
      ])
      setNewTaskTitle("")
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const updateTask = (id, newTitle) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)))
    setEditingId(null)
  }

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const statuses = ["pending", "in-progress", "completed"]
          const currentIndex = statuses.indexOf(t.status)
          return { ...t, status: statuses[(currentIndex + 1) % statuses.length] }
        }
        return t
      }),
    )
  }

  // Analytics data
  const completedTasks = tasks.filter((t) => t.status === "completed").length
  const pendingTasks = tasks.filter((t) => t.status === "pending").length
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length

  const analyticsData = [
    { name: "Completed", value: completedTasks, fill: "#10b981" },
    { name: "In Progress", value: inProgressTasks, fill: "#3b82f6" },
    { name: "Pending", value: pendingTasks, fill: "#f59e0b" },
  ]

  const weeklyData = [
    { day: "Mon", completed: 3, pending: 5 },
    { day: "Tue", completed: 4, pending: 4 },
    { day: "Wed", completed: 5, pending: 3 },
    { day: "Thu", completed: 6, pending: 2 },
    { day: "Fri", completed: 7, pending: 1 },
    { day: "Sat", completed: 5, pending: 3 },
    { day: "Sun", completed: 3, pending: 4 },
  ]

  

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">TaskFlow</span>
            </div>

            <div className="hidden md:flex items-center gap-4">
                <Button variant="ghost">Log in</Button>
              </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-4">
              <div className="flex gap-2 pt-4">
                <a href="/login" className="flex-1">
                  <Button variant="ghost" className="w-full">
                    Log in
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
      <section id="tasks" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Task Management Demo</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create, edit, and track tasks in real-time. Try adding a new task below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Task List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Tasks</h3>

                {/* Add Task Input */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTask()}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button onClick={addTask} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                {/* Task List Items */}
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition group"
                    >
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                          task.status === "completed"
                            ? "bg-green-500 border-green-500"
                            : task.status === "in-progress"
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300 hover:border-blue-500"
                        }`}
                      >
                        {(task.status === "completed" || task.status === "in-progress") && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </button>

                      {editingId === task.id ? (
                        <input
                          autoFocus
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onBlur={() => updateTask(task.id, editingTitle)}
                          onKeyPress={(e) => e.key === "Enter" && updateTask(task.id, editingTitle)}
                          className="flex-1 px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span
                          className={`flex-1 ${
                            task.status === "completed" ? "text-gray-500 line-through" : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </span>
                      )}

                      <button
                        onClick={() => {
                          setEditingId(task.id)
                          setEditingTitle(task.title)
                        }}
                        className="p-2 hover:bg-blue-100 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Task Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{pendingTasks}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="space-y-6">
              {/* Pie Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Task Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={analyticsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {analyticsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2 text-sm">
                  {analyticsData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-gray-600">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-sm">
                <div className="text-sm opacity-90 mb-2">Total Tasks</div>
                <div className="text-3xl font-bold mb-4">{tasks.length}</div>
                <div className="text-sm opacity-75">
                  {Math.round((completedTasks / tasks.length) * 100)}% completion rate
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Analytics */}
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Weekly Productivity</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#10b981" name="Completed" radius={[8, 8, 0, 0]} />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  )
}
