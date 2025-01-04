
import { Hono } from "hono";
import { userRouter } from './routes/user';


// Initialize Prisma Client
const app = new Hono<{
  Bindings:{
    JWT_SECRET: String;
    DATABASE_URL: string;
  }
}>()

app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);

app.use('/api/v1/blog/*' , async (c ,next) => {
  const header = c.req.header("Authorization") || "";

  const response = await verify(header ,c.env.JWT_SECRET as string);
  if (response.id){
    next()
  }else{
    c.status(403)
    return c.json({ error : "unauthorized"})
  }
});

app.post('/api/v1/blog', (c) => {
  return c.text('blog')
})
app.put('/api/v1/blog', (c) => {
  return c.text('blog')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('blog')
})

export default app
