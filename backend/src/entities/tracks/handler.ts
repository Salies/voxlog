import { Request, Response } from 'express';
import * as tracksService from './service';
import { stringify } from 'superjson';
import { z } from 'zod';

export async function getById(req: Request, res: Response) {
  try {
    const trackId = z.string().parse(req.params.trackId);

    const track = await tracksService.getById(trackId);

    if (track) {
      return res.status(200).json(stringify(track));
    } else {
      return res.status(404).json({ error: 'Track not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function searchByName(req: Request, res: Response) {
  const trackName = z.string().parse(req.query.trackName);

  try {
    const tracks = await tracksService.searchByName(trackName as string);

    if (tracks.length > 0) {
      return res.status(200).json(stringify(tracks));
    } else {
      return res.status(404).json({ error: 'No tracks found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getPopular(req: Request, res: Response) {
  try {
    const quantity = z.number().optional().parse(req.query.range) || 10;

    const popularTracks = await tracksService.getPopular(quantity);

    if (popularTracks.length > 0) {
      return res.status(200).json(stringify(popularTracks));
    } else {
      return res.status(404).json({ error: 'No tracks found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
