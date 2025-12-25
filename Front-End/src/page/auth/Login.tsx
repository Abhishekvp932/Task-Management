import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "@/service/User";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/HandleApiError";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/features/userSlice";
import type { RootState } from "@/store/store";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector((state:RootState)=>state.user.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(()=>{
    if(user){
      navigate('/home');
    }
  },[user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await Login(email, password);
      console.log("login response", data);
      dispatch(
        setUser({
          _id: data?.data?._id,
          name: data?.data?.name,
          email: data?.data?.email,
        })
      );
      navigate("/home");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
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
              Organize your work. Conquer your goals.
            </h1>
            <p className="text-lg opacity-90 leading-relaxed max-w-sm">
              TaskFlow helps you manage your tasks efficiently with intuitive
              features designed for productivity and collaboration.
            </p>
          </div>
        </div>

        <p className="text-sm opacity-75 relative z-10">
          © 2025 TaskFlow. All rights reserved.
        </p>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <div className="p-8 space-y-6 sm:p-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Welcome back
              </h2>
              <p className="text-muted-foreground text-base">
                Sign in to your account to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background border-input"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background border-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">Sign in</Button>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
