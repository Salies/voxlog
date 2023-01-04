import { Song as PSong } from '@prisma/client';
import { Song, Artist, Album } from '../../utils/dtos/Resources';

import { prisma, sql } from '../../utils/prisma';
import { TrackOut } from './dtos';

export async function searchByName(trackName: string): Promise<TrackOut[]> {
  const spacedTrackName = trackName.replace(' ', ' & ');
  const tracks: PSong[] = await prisma.song.findMany({
    where: {
      songTitle: {
        search: spacedTrackName,
      },
    },
    include: {
      inAlbum: {
        include: {
          fromArtist: true,
        },
      },
    },
  });

  return tracks;
}

export async function getById(trackId: string): Promise<TrackOut | null> {
  const songData = await prisma.$queryRaw(sql`
    SELECT "Song"."songId", "Song"."title", "Song"."coverArtUrl", "Song"."durationInSeconds", "Song"."albumId", \
    "Album"."albumId" as "albumId", "Album"."title" AS "albumTitle", "Album"."coverArtUrl" AS "albumCoverArtUrl", \
    "Artist"."artistId" as "artistId", "Artist"."name" AS "artistName", "Artist"."artUrl" AS "artistArtUrl" \
    FROM "Song" \
    INNER JOIN "Album" ON "Album"."albumId" = "Song"."albumId" \
    INNER JOIN "Artist" ON "Artist"."artistId" = "Album"."artistId" \
    WHERE "songId" = ${trackId} LIMIT 1;
    `);

  // const song: Song = {
  //   songId: songData[0].songId,
  //   title: songData[0].title,
  //   coverArtUrl: songData[0].coverArtUrl,
  //   durationInSeconds: songData[0].durationInSeconds,
  //   album: {
  //     albumId: songData[0].albumId,
  //     title: songData[0].albumTitle,
  //     coverArtUrl: songData[0].albumCoverArtUrl,
  //   },
  //   artist: {
  //     artistId: songData[0].artistId,
  //     name: songData[0].artistName,
  //     artUrl: songData[0].artistArtUrl,
  //   },
  // };
  // return song;
  return null;
}

export async function getPopular(quantity: number): Promise<TrackOut[]> {
  try {
    return [];
  } catch (error) {
    throw error;
  }
}
