import { prisma, sql } from '../../utils/prisma';
import { UserCreateIn, UserOut } from './dtos';

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

export async function create(user: UserCreateIn): Promise<UserOut | null> {
  try {
    const affectedRows = await prisma.$executeRaw(
      sql`INSERT INTO "User" ("username", "email", "password", "birthDate", "bio", "realName") VALUES (${user.username}, ${user.email}, ${user.password}, ${user.birthDate}, ${user.bio}, ${user.realName}) RETURNING "username", "email", "birthDate", "bio", "realName", "profilePictureUrl", "defaultTopArtistsRange", "defaultTopAlbumsRange", "defaultTopSongsRange", "createdAt", "updatedAt"`,
    );

    if (!affectedRows) return null;
    return getByUsername(user.username);
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
    LIMIT ${quantity}
  `);

    const songs = songsInMostRecentOrder.map((song) => {
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
    });

    return songs;
  } catch (error) {
    throw error;
  }
}
