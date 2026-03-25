//serves as a "client-side gatekeeper." Its primary use is to manage the User Experience (UX) by controlling
import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

interface Props {
  children: React.ReactNode //children is a special prop that allows you to pass components as props to other components. It is used to create reusable components that can wrap other components and provide additional functionality or styling.
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((state) => state.token) //checks the zustand auth store to see if the user is currently loogend in

  // fallback to localStorage if Zustand lost state
  const storedToken = token || localStorage.getItem("token")

  if (!storedToken) {//If no token is found in RAM or Storage, it triggers a Redirect.
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}