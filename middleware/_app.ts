import { router } from "./trpc";
import { authRouter } from "./route";


export const appRouter = () =>{
    auth: authRouter
}

export type AppRouter = typeof authRouter;