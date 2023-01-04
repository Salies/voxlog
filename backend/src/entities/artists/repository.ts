import { prisma, sql } from '../../utils/prisma';
import { ArtistOut } from './dtos';

export async function getById(artistId: string): Promise<ArtistOut | null> {
  return null;
}
