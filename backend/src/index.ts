import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";



// Initialize Prisma Client
const app = new Hono<{
  Bindings:{
    JWT_SECRET: String;
    DATABASE_URL: string;
  }
}>()

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  // Ensure name is included in the request body
  if (!body.name) {
    return c.json({ error: 'Name is required' }, 400);
  }

  const User = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name,  // Include the name field
    },
  });
  console.log(User)

  const token = await sign({ id: User.id }, c.env.JWT_SECRET as string);
  return c.json({ jwt: token });
});


app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body =  await c.req.json();
  const user = await prisma.user.findUnique({
    where: { 
      email: body.email,
      password: body.password,
     },
  });
  if(!user){
    c.status(403)
    return c.json({ error: 'user not found' }, 403);
  }

  const jwt = await sign({id: user.id}, c.env.JWT_SECRET as string)
  return c.json({ jwt },200)
})
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
