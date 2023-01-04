import { Request, Response } from 'express';
import { stringify } from 'superjson';
import { z } from 'zod';
import * as artistService from './service';

export async function getById(req: Request, res: Response) {
  try {
    const artistId = z.string().parse(req.params.artistId);

    const artist = await artistService.getById(artistId);

    if (artist) {
      return res.status(200).json({ artist: stringify(artist) });
    } else {
      return res.status(404).json({ error: 'Artist not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
