import {
  PrismaClient,
  Album as PAlbum,
  Song as PSong,
  Artist as PArtist,
  Prisma,
} from '@prisma/client';
import { Song } from '../utils/dtos/Resources';

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
      WHERE "songId" = ${songId}
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
}
