import { PrismaClient, Scrobble, Artist, Album, Song } from '@prisma/client';

import { DateTime } from 'luxon';

const prisma = new PrismaClient();

export default class ScrobbleModel {
  async create(scrobbleData: any): Promise<any> {
    const { userId, song, artist, album } = scrobbleData;

    const artistData: Artist = await prisma.artist.upsert({
      where: { mbArtistId: artist.mbArtistId },
      update: {
        artUrl: artist.artUrl,
      },
      create: {
        mbArtistId: artist.mbArtistId,
        name: artist.name,
      },
    });

    const albumData: Album = await prisma.album.upsert({
      where: { mbReleaseId: album.mbReleaseId },
      update: {
        coverArtUrl: album.coverArtUrl,
      },
      create: {
        title: album.title,
        mbReleaseId: album.mbReleaseId,
        coverArtUrl: album.coverArtUrl,
        artistId: artistData.artistId,
      },
    });

    const songData: Song = await prisma.song.upsert({
      where: { mbRecordingId: song.mbRecordingId },
      update: {},
      create: {
        title: song.title,
        mbRecordingId: song.mbRecordingId,
        durationInSeconds: Math.floor(song.durationInSeconds),
        coverArtUrl: song.coverArtUrl,
        albumId: albumData.albumId,
      },
    });

    const scrobble: Scrobble | null = await prisma.$transaction(
      async (prisma) => {
        // verify if the scrobble already exists (If the last scrobble was in the last "durationInSec" minutes)
        // This is to prevent duplicate scrobble entries.
        // also add a barrier to a song that was rapidly skipped

        const durationInSec = Math.floor(song.durationInSeconds);

        // const existingScrobble = await prisma.scrobble.findFirst({
        //   where: {
        //     userId,
        //     createdAt: {
        //       gte: DateTime.now().minus({ seconds: durationInSec }).toJSDate(),
        //       // gte: DateTime.now().minus({ seconds: minSecs }).toJSDate(),/
        //     },
        //   },
        // });

        // if (existingScrobble) {
        //   return null;
        // }

        //Otherwise create the scrobble
        const scrobble = await prisma.scrobble.create({
          data: {
            userId,
            songId: songData.songId,
          },
        });
        return scrobble;
      },
    );

    return scrobble;
  }
}
