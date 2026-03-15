import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Prisma } from "@prisma/client"

import { prisma } from "../config/prisma"

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Name, email, and password are required" })
    } //trim removes extra spaces

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword
      },
      select: { //tells the DB to send all this except pwd
        id: true,
        name: true,
        email: true
      }
    })

    res.status(201).json(user)

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({ message: "Email already registered" })
    }

    console.error("Registration failed:", error)
    res.status(500).json({ message: "Registration failed. Please check backend configuration." })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    )

    res.json({ token })

  } catch (error) {
    console.error("Login failed:", error)
    res.status(500).json({ message: "Login failed" })
  }
}
