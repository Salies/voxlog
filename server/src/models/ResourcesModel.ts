import {
  PrismaClient,
  Album as PAlbum,
  Song as PSong,
  Artist as PArtist,
  Prisma,
} from '@prisma/client';
import { Song, Artist, Album } from '../utils/dtos/Resources';

const prisma = new PrismaClient();
const sql = Prisma.sql;

export default class ResourcesModel {
  async getSongById(songId: string): Promise<Song | null> {
    const songData = await prisma.$queryRaw(sql`
      SELECT "Song"."songId", "Song"."title", "Song"."coverArtUrl", "Song"."durationInSeconds", "Song"."albumId", \
      "Album"."albumId" as "albumId", "Album"."title" AS "albumTitle", "Album"."coverArtUrl" AS "albumCoverArtUrl", \
      "Artist"."artistId" as "artistId", "Artist"."name" AS "artistName", "Artist"."artUrl" AS "artistArtUrl" \
      FROM "Song" \
      INNER JOIN "Album" ON "Album"."albumId" = "Song"."albumId" \
      INNER JOIN "Artist" ON "Artist"."artistId" = "Album"."artistId" \
      WHERE "songId" = ${songId} LIMIT 1;
    `);

    const song: Song = {
      songId: songData[0].songId,
      title: songData[0].title,
      coverArtUrl: songData[0].coverArtUrl,
      durationInSeconds: songData[0].durationInSeconds,
      album: {
        albumId: songData[0].albumId,
        title: songData[0].albumTitle,
        coverArtUrl: songData[0].albumCoverArtUrl,
      },
      artist: {
        artistId: songData[0].artistId,
        name: songData[0].artistName,
        artUrl: songData[0].artistArtUrl,
      },
    };
    return song;
  }

  async getArtistById(artistId: string): Promise<Artist | null> {
    const artistData: any[] = await prisma.$queryRaw(sql`
      SELECT "Artist"."artistId" as "artistId", "Artist"."name" AS "artistName", "Artist"."artUrl" AS "artistArtUrl" \
      FROM "Artist" \
      WHERE "artistId" = ${artistId} LIMIT 1;
    `);

    if (!artistData) return null;
    /*
    const topSongsArtist: any[] = await prisma.$queryRaw(sql`
      SELECT "Song"."title", "Song"."durationInSeconds", Count("Scrobble".ScrobbleId)
      FROM "Scrobble" \
      INNER JOIN "Song" ON "Scrobble"."songId" = "Song"."songId" \
      INNER JOIN "Album" ON "Album"."albumId" = "Song"."albumId" \
      WHERE "Album"."artistId" = ${artistId}
    `);
    */

    const artist = {
      artistId: artistData[0].artistId,
      name: artistData[0].artistName,
      artUrl: artistData[0].artistArtUrl,
    };

    return artist;
  }

  async getAlbumById(albumId: string): Promise<Album | null> {
    const albumData: any[] = await prisma.$queryRaw(sql`
      SELECT "Album"."albumId" as "albumId", "Album"."title" AS "albumTitle", "Album"."coverArtUrl" AS "coverArtUrl", \
      "Artist"."artistId" as "artistId", "Artist"."name" AS "artistName", "Artist"."artUrl" AS "artistArtUrl"
      FROM "Artist" \
      WHERE "albumId" = ${albumId} LIMIT 1;
    `);

    if (!albumData) return null;
    /*
    const topSongsArtist: any[] = await prisma.$queryRaw(sql`
      SELECT "Song"."title", "Song"."durationInSeconds", Count("Scrobble".ScrobbleId)
      FROM "Scrobble" \
      INNER JOIN "Song" ON "Scrobble"."songId" = "Song"."songId" \
      INNER JOIN "Album" ON "Album"."albumId" = "Song"."albumId" \
      WHERE "Album"."artistId" = ${artistId}
    `);
    */

    const album: Album = {
      albumId: albumData[0].albumId,
      title: albumData[0].title,
      coverArtUrl: albumData[0].coverArt,
      fromArtist: {
        artistId: albumData[0].artistId,
        name: albumData[0].artistName,
        artUrl: albumData[0].artistArtUrl,
      },
    };
    return album;
  }
}
