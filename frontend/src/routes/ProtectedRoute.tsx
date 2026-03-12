import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((state) => state.token)

  // fallback to localStorage if Zustand lost state
  const storedToken = token || localStorage.getItem("token")

  if (!storedToken) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}