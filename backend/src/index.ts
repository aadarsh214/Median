import { Hono } from 'hono'
import {PrismaClient} from '@prisma/client/edge'
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

  // Check if name, email, and password are provided
  if (!body.name || !body.email || !body.password) {
    return c.json({ error: 'Name, email, and password are required' }, 400);
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token });
  } catch (error) {
    console.error('Error creating user:', error);
    return c.json({ error: 'An error occurred during signup.' }, 500);
  }
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
