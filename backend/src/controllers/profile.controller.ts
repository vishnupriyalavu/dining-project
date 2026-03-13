import { Request, Response } from "express"

import { prisma } from "../config/prisma"

interface AuthRequest extends Request {
  userId?: string
}

export const getProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.userId

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Fetch profile error:", error)
    res.status(500).json({ message: "Failed to fetch profile" })
  }
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const { name } = req.body as { name?: string }

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  if (!name?.trim()) {
    return res.status(400).json({ message: "Name is required" })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name.trim(),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    res.json(updatedUser)
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Failed to update profile" })
  }
}
