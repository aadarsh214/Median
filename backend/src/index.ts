import { Hono } from 'hono'
import {PrismaClient } from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'

// Initialize Prisma Client
const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
  }
}>()

app.post('/', async (c) => {     
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());            //c => means context , it contains req , res , next , error
  
  const body  =  await c.req.json();
  await prisma.user.create({
    data : {
      email: body.email,
      password: body.password,
    },
  })
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', (c) => {
  return c.text('Signup Success')
})
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
