import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { registerSchema,type  RegisterFormData } from "../schemas/registerSchema"
import { registerUser } from "../services/authService"
import { useAuthStore } from "../store/authStore"
import { useCartStore } from "../store/cartStore"
import { toast } from "sonner"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function RegisterPage() {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    clearCart()
    logout()
  }, [clearCart, logout])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data)
      toast.success("Registered successfully. Please log in.")
      navigate("/login")
    } catch (error) {
      console.error(error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      )
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <Card className="w-[420px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <Label>Name</Label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
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
              Register
            </Button>
            <p className="text-center text-sm mt-4">
  Already have an account?{" "}
  <Link to="/login" className="text-blue-600 hover:underline">
    Login
  </Link>
</p>

          </form>

        </CardContent>
      </Card>

    </div>
  )
}
