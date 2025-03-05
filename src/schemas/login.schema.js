import {z} from 'zod'

export const loginSchema = z.object({
    email:z.string({message:"username is required"}).email(),
    password:z.string({message:"password is required"})
})