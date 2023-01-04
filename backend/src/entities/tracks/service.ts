import { Request, Response } from 'express';
import ResourcesModel from '../../models/ResourcesModel';
import { stringify } from 'superjson';
import * as tracksService from './service';
import * as tracksRepository from './repository';

export async function popularSongs(numberOfSongs: string) {
  try {
    const popularTracks = await tracksRepository.getPopularSongs(numberOfSongs);
    return popularTracks;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
