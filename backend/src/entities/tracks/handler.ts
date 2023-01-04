import { Request, Response } from 'express';
import ResourcesModel from '../../models/ResourcesModel';
import { stringify } from 'superjson';
import * as tracksService from './service';

const resourcesModel = new ResourcesModel();

export async function getTrackById(req: Request, res: Response) {
  try {
    const { songId } = req.params;
    const song = await resourcesModel.getTrackById(songId);
    const stringifiedTrack = stringify(song);
    return res.status(200).json(stringifiedTrack);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAlbumById(req: Request, res: Response) {
  try {
    const { albumId } = req.params;
    const album = await resourcesModel.getAlbumById(albumId);
    console.log('album', album);
    const stringifiedAlbum = stringify(album);
    return res.status(200).json(stringifiedAlbum);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function searchTrackByName(req: Request, res: Response) {
  const { songName } = req.query;
  try {
    const tracks = await resourcesModel.searchTrackByName(songName as string);
    const stringifiedTracks = stringify(tracks);
    return res.status(200).json(stringifiedTracks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getPopularTracks(req: Request, res: Response) {
  try {
    const { numberOfTracks } = req.params;
    const popularTracks = await tracksService.popularTracks(numberOfTracks);
    return res.status(200).json(popularTracks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
