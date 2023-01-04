import { DateTime } from 'luxon';
import { UserOut } from '../../utils/dtos/User';
import { prisma, sql } from '../../utils/prisma';

export async function getPassword(username: string): Promise<string> {
  try {
    const password: any = await prisma.$queryRaw(
      sql`SELECT "password" FROM "User" WHERE "username" = ${username} LIMIT 1`,
    );

    return password[0].password;
  } catch (error) {
    throw error;
  }
}

export async function create(user): Promise<UserOut> {
  try {
    const createdUser = await prisma.$executeRaw<UserOut>(
      sql`INSERT INTO "User" ("username", "email", "password", "birthDate", "bio", "realName") VALUES (${user.username}, ${user.email}, ${user.password}, ${user.birthDate}, ${user.bio}, ${user.realName}) RETURNING "username", "email", "birthDate", "bio", "realName", "profilePictureUrl", "defaultTopArtistsRange", "defaultTopAlbumsRange", "defaultTopSongsRange", "createdAt", "updatedAt"`,
    );

    return createdUser[0];
  } catch (error) {
    throw error;
  }
}

export async function getByUsername(username: string): Promise<UserOut | null> {
  try {
    const user: UserOut[] = await prisma.$queryRaw<UserOut[]>(
      sql`SELECT "username", "email", "birthDate", "bio", "realName", "profilePictureUrl", "defaultTopArtistsRange", "defaultTopAlbumsRange", "defaultTopSongsRange", "createdAt", "updatedAt" FROM "User" WHERE "username" = ${username} LIMIT 1`,
    );

    if (!user) return null;
    return user[0];
  } catch (error) {
    throw error;
  }
}

export async function getListeningStats(username: string): Promise<any> {
  return;
}

export async function getRecentScrobbles(username: string, quantity: number): Promise<any> {
  return;
}
