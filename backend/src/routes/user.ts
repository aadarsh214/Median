import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";  
import {SignupInput , SigninInput} from "@aadarshg214/medium-common";

// Initialize Prisma Client
export const userRouter = new Hono<{
  Bindings:{
    JWT_SECRET: string;
    DATABASE_URL: string;
  }
}>()


userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const  { sucess } = SignupInput.safeparse(body);
  if(!sucess){
    c.status(411);
    return c.json({ message: "Invalid signup input", })
  }

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

  const token = await sign({ id: User.id }, c.env.JWT_SECRET);
  return c.json({ jwt: token });
});


userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body =  await c.req.json();
  const { sucess } =SigninInput.safeparse(body);
  if(!sucess){
    c.status(411);
    return c.json({ message: "Invalid signin input", })
  }
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

  const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
  console.log("sign successful")
  return c.json({ jwt },200)
})