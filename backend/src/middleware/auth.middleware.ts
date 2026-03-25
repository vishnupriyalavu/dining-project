import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { JWT_SECRET } from "../config/env"

interface AuthRequest extends Request {//we are extending the default Request type to include a userId property, which will be set after successful authentication. This allows us to access the userId in our route handlers without TypeScript errors.
  userId?: string 
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization //bearer token

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization token missing"
    })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      message: "Token missing"
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as { userId: string }

    req.userId = decoded.userId

    next()

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    })
  }
}
