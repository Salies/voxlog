import { prisma, sql } from '../../utils/prisma';
import { AlbumOut } from './dtos';

export async function getById(albumId: string): Promise<AlbumOut | null> {
  return null;
}
