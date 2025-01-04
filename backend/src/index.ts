
import { Hono } from "hono";
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';



// Initialize Prisma Client
const app = new Hono<{
  Bindings:{
    JWT_SECRET: String;
    DATABASE_URL: string;
  }
}>()

app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);




export default app;