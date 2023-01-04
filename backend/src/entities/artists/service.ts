import { ArtistOut } from './dtos';
import * as albumsRepository from './repository';

export async function getById(albumId: string): Promise<ArtistOut | null> {
  try {
    return await albumsRepository.getById(albumId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
