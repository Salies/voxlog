import { z } from 'zod';

export const UserCreateInSchema = z.object({
  username: z.string().regex(/^[a-zA-Z][a-zA-Z0-9]*$/),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/),
  email: z.string().email(),
  birthDate: z.date(),
  bio: z.string().optional(),
  realName: z.string().optional(),
});

export const UserLoginInSchema = z.object({
  username: z.string().regex(/^[a-zA-Z][a-zA-Z0-9]*$/),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/),
});

export const UserOutSchema = z.object({
  userId: z.string(),
  username: z.string(),
  email: z.string(),
  birthDate: z.date(),
  bio: z.string().optional(),
  realName: z.string().optional(),
  profilePictureUrl: z.string().optional(),
  defaultTopArtistsRange: z.string(),
  defaultTopAlbumsRange: z.string(),
  defaultTopSongsRange: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserCreateIn = z.infer<typeof UserCreateInSchema>;
export type UserLoginIn = z.infer<typeof UserLoginInSchema>;
export type UserOut = z.infer<typeof UserOutSchema>;
