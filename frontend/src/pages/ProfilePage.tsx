import { useEffect, useMemo, useState } from "react"
import { LogOut, Mail, PencilLine, ReceiptText } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { API_BASE_URL } from "../services/api"
import { useAuthStore } from "../store/authStore"

interface Profile {
  id?: string
  name: string
  email: string
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const [profile, setProfile] = useState<Profile>({ id: "", name: "", email: "" })
  const [draftName, setDraftName] = useState("")
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          throw new Error("Missing token")
        }

        const response = await fetch(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch profile")
        }

        setProfile({
          id: data?.id || "",
          name: data?.name || "",
          email: data?.email || "",
        })
        setDraftName(data?.name || "")
      } catch (error) {
        console.error("Profile fetch failed:", error)
      } finally {
        setLoading(false)
      }
    }

    void fetchProfile()
  }, [])

  const initials = useMemo(() => {
    return profile.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "DU"
  }, [profile.name])

  const handleUpdateProfile = async () => {
    setSuccessMessage("")
    setErrorMessage("")

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("Please log in again.")
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: draftName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update profile")
      }

      setProfile({
        id: data?.id || profile.id,
        name: data?.name || draftName,
        email: data?.email || profile.email,
      })
      setDraftName(data?.name || draftName)
      setSuccessMessage("Profile updated successfully")
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update profile"
      )
    }

    window.setTimeout(() => {
      setSuccessMessage("")
    }, 2500)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-slate-500">Loading profile...</p>
      </section>
    )
  }

  return (
    <section className="min-h-[calc(100vh-88px)] bg-[radial-gradient(circle_at_top_left,_rgba(112,25,61,0.12),_transparent_26%),linear-gradient(180deg,_#fdf9fb_0%,_#ffffff_48%,_#fbf3f7_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl justify-center">
        <Card className="w-full max-w-[500px] rounded-[28px] border border-[#70193d]/10 bg-white shadow-lg shadow-[#70193d]/10 transition-all hover:shadow-xl">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#f6d7e3] via-[#edd1dc] to-[#d6a4b7] text-3xl font-black text-[#70193d] shadow-inner">
                {initials}
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                {profile.name || "Dining User"}
              </h1>
              <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#f8eff3] px-4 py-2 text-sm text-slate-500">
                <Mail className="h-4 w-4 text-[#70193d]" />
                {profile.email}
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-100 bg-slate-50/70 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-white p-3 text-[#70193d] shadow-sm ring-1 ring-[#70193d]/5">
                  <PencilLine className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Edit Profile
                  </h2>
                  <p className="text-sm text-slate-500">
                    Update your display information.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-name">Name</Label>
                  <Input
                    id="profile-name"
                    value={draftName}
                    onChange={(event) => setDraftName(event.target.value)}
                    placeholder="Enter your name"
                    className="h-12 rounded-xl border-slate-200 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-email">Email</Label>
                  <Input
                    id="profile-email"
                    value={profile.email}
                    readOnly
                    className="h-12 rounded-xl border-slate-200 bg-slate-100 text-slate-500"
                  />
                </div>

                {successMessage ? (
                  <p className="rounded-xl border border-[#70193d]/10 bg-[#f8eff3] px-4 py-3 text-sm font-medium text-[#70193d]">
                    {successMessage}
                  </p>
                ) : null}

                {errorMessage ? (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {errorMessage}
                  </p>
                ) : null}

                <Button
                  type="button"
                  onClick={() => void handleUpdateProfile()}
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-[#4a0d29] via-[#70193d] to-[#9a4d6c] text-base font-bold text-white shadow-lg shadow-[#70193d]/20 transition-all hover:shadow-xl hover:from-[#5b1031] hover:via-[#7f1d46] hover:to-[#ad5f7d]"
                >
                  Update Profile
                </Button>
              </div>
            </div>

            <div className="grid gap-3 rounded-[24px] border border-[#70193d]/10 bg-[#fbf3f7] p-4">
              <Link
                to="/orders"
                className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:shadow-md"
              >
                <span className="inline-flex items-center gap-2">
                  <ReceiptText className="h-4 w-4 text-[#70193d]" />
                  My Orders
                </span>
                <span className="text-[#70193d]">Open</span>
              </Link>

              <div className="rounded-xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                <p className="font-semibold text-slate-800">Account Info</p>
                <p className="mt-1">{profile.email}</p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md"
              >
                <span className="inline-flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </span>
                <span>Now</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
