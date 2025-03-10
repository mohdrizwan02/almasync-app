import {z} from 'zod'

export const loginSchema = z.object({
    email:z.string({message:"Invalid email format"}).email(),
    password:z.string({message:"invalid password format"}).nonempty({message:"Password is required"}),
    rememberMe:z.boolean().default(false).optional(),
})