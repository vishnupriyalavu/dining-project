import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "../schemas/loginSchema"
import { loginUser } from "../services/authService"
import { useAuthStore } from "../store/authStore"
import { Link, useNavigate } from "react-router-dom"
import { useCartStore } from "../store/cartStore"
import { toast } from "sonner"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

export default function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken)
  const logout = useAuthStore((state) => state.logout)
  const clearCart = useCartStore((state) => state.clearCart)
  const navigate = useNavigate()

  useEffect(() => {
    clearCart()
    logout()
  }, [clearCart, logout])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data)

      setToken(response.token)
      toast.success("Logged in successfully")
      navigate("/")
    } catch (error) {
      console.error("Login failed:", error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please check your email and password."
      )
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 via-white to-red-100">
      <Card className="w-[420px] shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-orange-600">
            🍽 Dining App
          </CardTitle>

          <p className="text-center text-sm text-gray-500">
            Order your favorite food instantly
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <Label>Password</Label>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Login
            </Button>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
