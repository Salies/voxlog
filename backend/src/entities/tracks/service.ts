import * as tracksRepository from './repository';
import { TrackOut } from './dtos';

export async function getPopular(quantity: number): Promise<TrackOut[]> {
  try {
    const popularTracks = await tracksRepository.getPopular(quantity);
    return popularTracks;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getById(trackId: string): Promise<TrackOut | null> {
  try {
    const track = await tracksRepository.getById(trackId);
    return track;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function searchByName(trackName: string): Promise<TrackOut[]> {
  try {
    const tracks = await tracksRepository.searchByName(trackName);
    return tracks;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
