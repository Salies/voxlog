import { Request, Response } from 'express';
import ResourcesModel from '../models/ResourcesModel';

import { stringify } from 'superjson';

const resourcesModel = new ResourcesModel();

export default class ResourcesController {
  async getSongById(req: Request, res: Response) {
    try {
      const { songId } = req.params;
      const song = await resourcesModel.getSongById(songId);
      const stringifiedSong = stringify(song);
      return res.status(200).json(stringifiedSong);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAlbumById(req: Request, res: Response) {
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

  async getArtistById(req: Request, res: Response) {
    try {
      const { artistId } = req.params;
      const artist = await resourcesModel.getArtistById(artistId);
      console.log('artist', artist);
      const stringifiedArtist = stringify(artist);
      return res.status(200).json(stringifiedArtist);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // async get
}
