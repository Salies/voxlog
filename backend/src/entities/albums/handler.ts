import { Request, Response } from 'express';
import { stringify } from 'superjson';
import { z } from 'zod';
import * as albumService from './service';

export async function getById(req: Request, res: Response) {
  try {
    const albumId = z.string().parse(req.params.albumId);

    const album = await albumService.getById(albumId);

    if (album) {
      return res.status(200).json({ album: stringify(album) });
    } else {
      return res.status(404).json({ error: 'Album not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
