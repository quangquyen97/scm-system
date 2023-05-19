import {publicProcedure, router} from'./trpc'
import {z} from "zod"

export const authRouter = router({
    login: publicProcedure.input(z.object({userEmail: z.string().email(), userPassword: z.string()})).mutation(({input}) => { 

     })
});
