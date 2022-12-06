import { PrismaClient, Song, Album, Artist } from '@prisma/client';

const prisma = new PrismaClient();

export default class ResourcesModel {
  async getSongById(songId: string): Promise<any | null> {}
}
