import { Prisma, PrismaClient } from '@prisma/client';
import { UserCreateIn, UserOut } from '../utils/dtos/User';
import { hashPassword, rangeToDays } from '../utils/helpers';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();
const sql = Prisma.sql;
export default class UserModel {
  async get(username: string): Promise<UserOut | null> {
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

  async getPassword(username: string): Promise<string> {
    try {
      const password: any = await prisma.$queryRaw(
        sql`SELECT "password" FROM "User" WHERE "username" = ${username} LIMIT 1`,
      );

      if (!password) return null;
      return password[0].password;
    } catch (error) {
      throw error;
    }
  }
  async create(userData: UserCreateIn): Promise<UserOut> {
    const birthDate = DateTime.fromISO(userData.birthDate).toISODate();
    const hashedPassword = await hashPassword(userData.password);
    try {
      const user = await prisma.$executeRaw<UserOut>(
        sql`INSERT INTO "User" ("username", "email", "password", "birthDate", "bio", "realName") VALUES (${userData.username}, ${userData.email}, ${hashedPassword}, ${birthDate}, ${userData.bio}, ${userData.realName}) RETURNING "username", "email", "birthDate", "bio", "realName", "profilePictureUrl", "defaultTopArtistsRange", "defaultTopAlbumsRange", "defaultTopSongsRange", "createdAt", "updatedAt"`,
      );

      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async getTopSongs(
    username: string,
    rangeInDays: number,
  ): Promise<any[] | null> {
    try {
      if (!rangeInDays) {
        const { defaultTopSongsRange: range } = await prisma.user.findUnique({
          where: {
            username,
          },
          select: {
            defaultTopSongsRange: true,
          },
        });
        if (!range) return null;

        rangeInDays = rangeToDays(range);
      }

      const recentTopSongScrobbles = await prisma.scrobble.groupBy({
        by: ['songId'],
        where: {
          AND: [
            {
              createdAt: {
                gte: new Date(Date.now() - rangeInDays * 24 * 60 * 60 * 1000),
              },
            },
            { user: { username } },
          ],
        },
        _count: {
          songId: true,
        },
        orderBy: {
          _count: {
            songId: 'desc',
          },
        },
      });

      const recentTopSongsInfo = await prisma.song.findMany({
        where: {
          songId: {
            in: recentTopSongScrobbles.map((scrobble) => scrobble.songId),
          },
        },
        select: {
          songId: true,
          title: true,
          durationInSeconds: true,
          coverArtUrl: true,
          inAlbum: {
            select: {
              fromArtist: {
                select: {
                  name: true,
                },
              },
              title: true,
            },
          },
        },
      });
      return recentTopSongsInfo.map((song) => {
        const scrobble = recentTopSongScrobbles.find(
          (scrobble) => scrobble.songId === song.songId,
        );
        return {
          ...song,
          playCount: scrobble._count.songId,
        };
      });
    } catch (error) {
      throw error;
    }
  }
}
