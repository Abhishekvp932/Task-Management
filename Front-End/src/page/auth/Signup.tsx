import { useState } from "react"
import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Signup } from "@/service/User"
import {toast,ToastContainer} from 'react-toastify';
import { handleApiError } from "@/utils/HandleApiError"
export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate();
  const validateField = (name: string, value: string) => {
    let err = ""

    if (name === "email") {
      const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailpattern.test(value)) err = "Invalid email address"
    }

    if (name === "password") {
      if (value.length < 6) err = "Password must be at least 6 characters"
    }

    if (name === "confirmPassword") {
      if (value !== form.password) err = "Passwords do not match"
    }

    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        const data = await Signup(form.fullName,form.email,form.password);
        toast.success(data?.msg);
        navigate('/');
    } catch (error) {
       toast.error(handleApiError(error));
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-40 h-40 rounded-full border border-primary-foreground/20" />
          <div className="absolute bottom-32 left-10 w-32 h-32 rounded-full border border-primary-foreground/20" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold tracking-tight">TaskFlow</span>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6 text-balance">
              Join thousands managing tasks smarter
            </h1>
            <p className="text-lg opacity-90 leading-relaxed max-w-sm">
              Get started with TaskFlow today and experience powerful task management tools.
            </p>
          </div>
        </div>

        <p className="text-sm opacity-75 relative z-10">© 2025 TaskFlow. All rights reserved.</p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <div className="p-8 space-y-6 sm:p-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Create your account</h2>
              <p className="text-muted-foreground text-base">Get started with TaskFlow today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Full name</label>
                <Input
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email address</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm password</label>
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>

              <Button type="submit" className="w-full">Create Account</Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </Card>
      </div>
      <ToastContainer autoClose ={200}/>
    </div>
  )
}
