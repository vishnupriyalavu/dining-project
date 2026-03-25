const getRequiredEnv = (key: string, fallback?: string) => {
  const value = process.env[key] || fallback

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export const JWT_SECRET = getRequiredEnv("JWT_SECRET", "secret")
export const FRONTEND_URL = getRequiredEnv(
  "FRONTEND_URL",
  "http://localhost:5173"
)

export const getStripeSecretKey = () => getRequiredEnv("SECRET_KEY")
