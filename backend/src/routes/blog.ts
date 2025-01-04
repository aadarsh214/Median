import { Hono } from "hono";
import { verify } from "hono/jwt";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
 }>();

 
blogRouter.use('/api/v1/blog/*' , async (c ,next) => {
    const header = c.req.header("Authorization") || "";
  
    const response = await verify(header ,c.env.JWT_SECRET as string);
    if (response.id){
      next()
    }else{
      c.status(403)
      return c.json({ error : "unauthorized"})
    }
  });
  
  blogRouter.post('/api/v1/blog', (c) => {
    return c.text('blog')
  })
  blogRouter.put('/api/v1/blog', (c) => {
    return c.text('blog')
  })
  blogRouter.get('/api/v1/blog/:id', (c) => {
    return c.text('blog')
  })
  
  export default blogRouter;
  