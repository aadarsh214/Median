import { Hono } from 'hono'
import {PrismaClient } from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'
const app = new Hono()

app.post('/', (c) => {     
  const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate())              //c => means context , it contains req , res , next , error
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
