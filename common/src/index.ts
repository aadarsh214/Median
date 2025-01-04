import { z } from "zod";


export const SignupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
    name: z.string().min(2).max(32),
})

export type SignupInput = z.infer<typeof SignupInput>

export const SigninInput = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
})

export type SigninInput = z.infer<typeof SigninInput>

export const BlogPostInput = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(10000),
})

export type BlogPostInput = z.infer<typeof BlogPostInput>

export const BlogPostUpdate = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(10000),
    published: z.boolean(),
    id: z.string(),
})

export type BlogPostUpdate = z.infer<typeof BlogPostUpdate>