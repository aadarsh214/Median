import { Hono } from 'hono'
import {PrismaClient} from '@prisma/client/edge.js'
import {withAccelerate} from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import { SignatureKey } from 'hono/utils/jwt/jws'

// Initialize Prisma Client
const app = new Hono<{
  Bindings:{
    JWT_SECRET: SignatureKey
    DATABASE_URL: string
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

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name,  // Include the name field
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt: token });
});


app.post('/api/v1/signin', (c) => {
  return c.text('Signin Success')
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
