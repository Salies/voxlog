import { Prisma, PrismaClient } from '@prisma/client';
import { UserCreateIn, UserOut, UserRecentTracksOut } from '../utils/dtos/User';
import { hashPassword, rangeToDays } from '../utils/helpers';
import { DateTime } from 'luxon';
import { Decimal } from '@prisma/client/runtime';
import { Song } from '../utils/dtos/Resources';

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

  async getTotalHours(username: string): Promise<number | null> {
    try {
      const totalSeconds: Array<{ sum: Decimal }> = await prisma.$queryRaw<
        Array<{ sum: Decimal }>
      >(sql`
      SELECT SUM ("Song"."durationInSeconds") 
      FROM "User"
      INNER JOIN "Scrobble" ON "Scrobble"."userId" = "User"."userId"
      INNER JOIN "Song" ON "Song"."songId" = "Scrobble"."songId"
      WHERE "User"."userId" = (SELECT "userId" FROM "User" WHERE "username" = ${username} LIMIT 1)
      LIMIT 1
      `);
      if (!totalSeconds) return null;
      const totalHours = Number(totalSeconds[0].sum) / 3600;
      return totalHours;
    } catch (error) {
      throw error;
    }
  }

  async getTotalSongs(username: string): Promise<number | null> {
    try {
      // Sum the duration of all songs scrobbled by the user
      const totalSongs: Array<{ sum: Decimal }> = await prisma.$queryRaw<
        Array<{ sum: Decimal }>
      >(sql`
        SELECT COUNT("Scrobble"."songId") 
        FROM "Scrobble"
        WHERE "Scrobble"."userId" = (SELECT "userId" FROM "User" WHERE "username" = ${username} LIMIT 1)
        Group by "songId"
        LIMIT 1
      `);
      if (!totalSongs) return null;
      return Number(totalSongs);
    } catch (error) {
      throw error;
    }
  }

  async getTotalArtists(username: string): Promise<number | null> {
    try {
      // Sum the duration of all songs scrobbled by the user
      const totalArtists: Array<{ sum: Decimal }> = await prisma.$queryRaw<
        Array<{ sum: Decimal }>
      >(sql`
        SELECT COUNT("Album"."artistId")
        FROM "Scrobble"
        INNER JOIN "Song" ON "Scrobble"."songId" = "Song"."songId"
        INNER JOIN "Album" ON "Song"."albumId" = "Album"."albumId"
        WHERE "Scrobble"."userId" = (SELECT "userId" FROM "User" WHERE "username" = ${username} LIMIT 1)
        Group by "Album"."artistId"
        LIMIT 1
      `);
      if (!totalArtists) return null;
      return Number(totalArtists);
    } catch (error) {
      throw error;
    }
  }

  async getTotalAlbums(username: string): Promise<number | null> {
    try {
      // Sum the duration of all songs scrobbled by the user
      const totalAlbums: Array<{ sum: Decimal }> = await prisma.$queryRaw<
        Array<{ sum: Decimal }>
      >(sql`
        SELECT COUNT("Song"."albumId")
        FROM "Scrobble"
        INNER JOIN "Song" ON "Scrobble"."songId" = "Song"."songId"
        WHERE "Scrobble"."userId" = (SELECT "userId" FROM "User" WHERE "username" = ${username} LIMIT 1)
        Group by "Song"."albumId"
        LIMIT 1
      `);
      if (!totalAlbums) return null;
      return Number(totalAlbums);
    } catch (error) {
      throw error;
    }
  }

  async getRecentScrobbles(
    username: string,
    limit: number,
  ): Promise<UserRecentTracksOut[]> {
    try {
      const songsInMostRecentOrder: any[] = await prisma.$queryRaw(sql`
      SELECT "Song"."songId" as "songId", "Song"."title" as "songTitle", "Song"."coverArtUrl" as "coverArtUrl", \
      "Album"."coverArtUrl" AS "albumCoverArtUrl", \
      "Artist"."artistId" as "artistId", "Artist"."name" AS "artistName", \
      "Scrobble"."createdAt" as "scrobbleCreatedAt" \
      FROM "Scrobble" \
      INNER JOIN "Song" ON "Scrobble"."songId" = "Song"."songId" \
      INNER JOIN "Album" ON "Song"."albumId" = "Album"."albumId" \
      INNER JOIN "Artist" ON "Album"."artistId" = "Artist"."artistId" \
      WHERE "Scrobble"."userId" = (SELECT "userId" FROM "User" WHERE "username" = ${username} LIMIT 1) \
      ORDER BY "Scrobble"."createdAt" DESC \
      LIMIT ${limit}
    `);

      const songs: UserRecentTracksOut[] = songsInMostRecentOrder.map(
        (song) => {
          return {
            scrobbleCreatedAt: song.scrobbleCreatedAt,
            song: {
              songId: song.songId,
              songTitle: song.songTitle,
              coverArtUrl: song.coverArtUrl,
            },
            album: {
              coverArtUrl: song.albumCoverArtUrl,
            },
            artist: {
              artistId: song.artistId,
              name: song.artistName,
            },
          };
        },
      );

      return songs;
    } catch (error) {
      throw error;
    }
  }

  // async getTopSongs(
  //   username: string,
  //   rangeInDays: number,
  // ): Promise<any[] | null> {
  //   try {
  //     if (!rangeInDays) {
  //       const { defaultTopSongsRange: range } = await prisma.user.findUnique({
  //         where: {
  //           username,
  //         },
  //         select: {
  //           defaultTopSongsRange: true,
  //         },
  //       });
  //       if (!range) return null;

  //       rangeInDays = rangeToDays(range);
  //     }

  //     const recentTopSongScrobbles = await prisma.scrobble.groupBy({
  //       by: ['songId'],
  //       where: {
  //         AND: [
  //           {
  //             createdAt: {
  //               gte: new Date(Date.now() - rangeInDays * 24 * 60 * 60 * 1000),
  //             },
  //           },
  //           { user: { username } },
  //         ],
  //       },
  //       _count: {
  //         songId: true,
  //       },
  //       orderBy: {
  //         _count: {
  //           songId: 'desc',
  //         },
  //       },
  //     });

  //     const recentTopSongsInfo = await prisma.song.findMany({
  //       where: {
  //         songId: {
  //           in: recentTopSongScrobbles.map((scrobble) => scrobble.songId),
  //         },
  //       },
  //       select: {
  //         songId: true,
  //         title: true,
  //         durationInSeconds: true,
  //         coverArtUrl: true,
  //         inAlbum: {
  //           select: {
  //             fromArtist: {
  //               select: {
  //                 name: true,
  //               },
  //             },
  //             title: true,
  //           },
  //         },
  //       },
  //     });
  //     return recentTopSongsInfo.map((song) => {
  //       const scrobble = recentTopSongScrobbles.find(
  //         (scrobble) => scrobble.songId === song.songId,
  //       );
  //       return {
  //         ...song,
  //         playCount: scrobble._count.songId,
  //       };
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
