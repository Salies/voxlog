
import { DaysRange, PrismaClient, User, Scrobble } from "@prisma/client";
import { Sql } from "@prisma/client/runtime";
import { UserCreateIn, UserOut, UserProfileOut } from "../utils/dtos/User";
import { hashPassword, rangeToDays } from "../utils/helpers";


const prisma = new PrismaClient();

export default class UserModel {
  async create(userData: UserCreateIn): Promise<UserOut> {
    console.log(userData);
    const birthDate = new Date(userData.birthDate);
    const hashedPassword = await hashPassword(userData.password);
    const user = await prisma.user.create({
      data: {
        ...userData,
        birthDate,
        password: hashedPassword,
      },
    });

    return this._formatUser(user);
  }

  async get(username: string): Promise<UserOut | null> {
    const user: User = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return this._formatUser(user);
  }

  async getUserInfo(username: string): Promise<any | null> {
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
  }

  async getTopSongs(
    username: string,
    rangeInDays: number
  ): Promise<any[] | null> {
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
      by: ["songId"],
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
          songId: "desc",
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
        (scrobble) => scrobble.songId === song.songId
      );
      return {
        ...song,
        playCount: scrobble._count.songId,
      };
    });
  }

  _formatUser(user: User): UserOut {
    const userOut: UserOut = {
      username: user.username,
      email: user.email,
      birthdate: user.birthDate.toISOString(),
      bio: user.bio,
      realName: user.realName,
      createdAt: user.createdAt.toISOString(),
    };
    return userOut;
  }
}
