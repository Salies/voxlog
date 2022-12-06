import {
  Prisma,
  DaysRange,
  PrismaClient,
  User,
  Scrobble,
} from '@prisma/client';
import SuperJSON, { parse, serialize, stringify } from 'superjson';
import { SuperJSONResult } from 'superjson/dist/types';

import { UserCreateIn, UserOut, UserProfileOut } from '../utils/dtos/User';
import { hashPassword, rangeToDays } from '../utils/helpers';

const prisma = new PrismaClient();

export default class UserModel {
  async create(userData: UserCreateIn): Promise<UserOut> {
    const birthDate = new Date(userData.birthDate);
    const hashedPassword = await hashPassword(userData.password);
    try {
      const user = await prisma.user.create({
        data: {
          ...userData,
          birthDate,
          password: hashedPassword,
        },
      });
      return this._formatUser(user);
    } catch (error) {
      throw error;
    }
  }

  async get(username: string): Promise<string | null> {
    try {
      const user: UserOut[] = await prisma.$queryRaw<UserOut[]>(
        Prisma.sql`SELECT "username", "email", "birthDate", "bio", "realName", "profilePictureUrl", "defaultTopArtistsRange", "defaultTopAlbumsRange", "defaultTopSongsRange", "createdAt", "updatedAt" FROM "User" WHERE "username" = ${username} LIMIT 1`,
      );

      if (!user) return null;
      const serialized = stringify(user[0]);
      return serialized;
    } catch (error) {
      throw error;
    }
  }

  async getPassword(username: string): Promise<string> {
    try {
      const password = await prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          password: true,
        },
      });
      return password.password;
    } catch (error) {
      throw error;
    }
  }

  async getUserInfo(username: string): Promise<any | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          username: true,
          profilePictureUrl: true,
          bio: true,
          realName: true,
          createdAt: true,
        },
      });
      return user;
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

  _formatUser(user: User): UserOut {
    try {
      const userOut: UserOut = {
        username: user.username,
        email: user.email,
        birthdate: user.birthDate.toISOString(),
        bio: user.bio,
        realName: user.realName,
        createdAt: user.createdAt.toISOString(),
      };
      return userOut;
    } catch (error) {
      throw error;
    }
  }
}
