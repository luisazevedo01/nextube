import { object, string } from 'zod'

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: 'username is required',
    }),
    email: string({
      required_error: 'email is required',
    }),
    password: string({
      required_error: 'password is required',
    }).min(6, "Password must be at least 6 characters long").max(64, "Password must have less than 64 characters"),
    confirmPassword: string({
      required_error: 'confirm password is required',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })
}
